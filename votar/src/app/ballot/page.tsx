"use client";
// Import necessary modules
import Image from 'next/image'
import CandidateItem from '@/components/CandidateItem'
import { useState } from 'react';
import { Candidate } from '@/models/candidate';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Confirmation from '@/components/modals/Confirmation';
import { AuthContext } from "@/provider/AuthProvider";
import { useRouter } from 'next/navigation';
import useAuthentication from '@/hooks/useAuthentication';
import database from '@/util/database';
import { Vote } from '@/models/vote';
import { UUID } from 'crypto';
import { auth } from '@/util/firebase';
import { Voter } from '@/models/voter';
import { HOME_ROUTE } from '@/constants/routes';




// Define the Home component
export default function Home() {
  // Initialize state to manage the checked candidate ID
  const [checkedId, setCheckedId] = useState("");
  const [voter, setVoter] = useState<any>();
  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState('');
  const router = useRouter();


  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        
        const userID = user.uid;
``
        const promisedVoter: Promise<Voter | undefined> = database.getVoter(userID);

        promisedVoter.then((voter) => {
          if (voter) {
            setVoter(voter);
          }
        });

       
      }
    });
  }
  , []);


  // Function to handle checkbox change
  const handleChange = (id: string) => {
    setCheckedId(id);
  };
  // Define candidate data
  const candidates: Candidate[] = [{

    id: '1',
    profileImage: 'https://avatars.githubusercontent.com/u/62628408?v=4',
    firstName: 'John',
    lastName: 'Doe',
    party: 'Independent',
    partyLogo: 'party1.jpg',
    manifesto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget turpis vel odio porta posuere.'
  },
  {
    id: '2',
    profileImage: 'profile2.jpg',
    firstName: 'Jane',
    lastName: 'Smith',
    party: 'Democratic Party',
    partyLogo: 'party2.jpg',
    manifesto: 'Nulla nec orci non augue fermentum viverra. Phasellus tempus, tortor et bibendum tempor.'
  },
  {
    id: '3',
    profileImage: 'profile3.jpg',
    firstName: 'Michael',
    lastName: 'Johnson',
    party: 'Republican Party',
    partyLogo: 'party3.jpg',
    manifesto: 'Vestibulum id tincidunt metus. Vivamus in dui vel lectus eleifend viverra.'
  },
  {
    id: '4',
    profileImage: 'profile4.jpg', // Placeholder - use a real image URL
    firstName: 'Sarah',
    lastName: 'Williams',
    party: 'Green Party',
    partyLogo: 'party4.jpg', // Placeholder - use a real image URL 
    manifesto: 'Proin at mauris sit amet sem lacinia ullamcorper. Fusce vitae mauris a felis interdum laoreet.'
  },

  // Fake Candidate 5
  {
    id: '5',
    profileImage: 'profile5.jpg', // Placeholder - use a real image URL
    firstName: 'William',
    lastName: 'Brown',
    party: 'Libertarian Party',  
    partyLogo: 'party5.jpg', // Placeholder - use a real image URL 
    manifesto: 'Integer sed magna sed est lobortis aliquam. Donec ac dolor ac tellus feugiat semper vitae vitae enim.'
  },

  // Fake Candidate 6
  {
    id: '6',
    profileImage: 'profile6.jpg', // Placeholder - use a real image URL
    firstName: 'Emily',
    lastName: 'Davis',
    party: 'Progressive Party', 
    partyLogo: 'party6.jpg', // Placeholder - use a real image URL 
    manifesto: 'Donec quis purus et lorem laoreet aliquet vel quis elit. Nullam tincidunt nulla eget nunc porta accumsan.'
  }
];

  const handleSubmit = async() => {
    const selectedCandidateIndex = candidates.findIndex(candidate => candidate.id === checkedId);
    const thisVoter = voter;
    const vote: Vote = {
      // party id is a string
      party_id: candidates[selectedCandidateIndex].id,
      voter: thisVoter,
      // get random 6 digit
      vote_id: `v_${Math.floor(100000 + Math.random() * 900000)}`
    }

    try {
      await database.addVote(vote);
      console.log('Vote added: ', vote);
      alert('Succesfully');
      router.push(HOME_ROUTE);
    } catch (error) {
      console.error('Error adding vote: ', error);
    }
  }

  const selectedCandidate = candidates.find(candidate => candidate.id === checkedId);


  // Return JSX for rendering
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold mb-4">Vote for your favourite candidate</h1>
      {voter ? ( // Check if voter is found
        <div className="flex flex-col items-start gap-4">
          <p>
            Welcome, {voter.firstName} {voter.lastName} from {voter.province} province.
          </p>
          {/* Map over candidates and render Candidate components */}
          {candidates.map((candidate) => (
            <CandidateItem
              key={candidate.id}
              id={candidate.id}
              label={candidate.firstName}
              checked={checkedId === candidate.id}
              onChange={handleChange}
              candidate={candidate}
            />
          ))}
        </div>
      ) : (
        <p>Loading user data...</p> // Render loading message while waiting for voter to be found
      )}
  
      {selectedCandidate && (
        <Confirmation candidate={selectedCandidate} onSubmit={handleSubmit} />
      )}
    </div>
  )
}