"use client";
// Import necessary modules
import Image from 'next/image'
import CandidateItem from '@/components/CandidateItem'
import { useState } from 'react';
import { Candidate } from '@/models/candidate';

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



// Define the Home component
export default function Home() {
  // Initialize state to manage the checked candidate ID
  const [checkedId, setCheckedId] = useState("");

  // Function to handle checkbox change
  const handleChange = (id: string) => {
    setCheckedId(id);
  };

  // Define candidate data
  const candidates: Candidate[] = [{

    id: '1',
    profileImage: 'profile1.jpg',
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
  }
  ];

  const selectedCandidate = candidates.find(candidate => candidate.id === checkedId);

  // Return JSX for rendering
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold mb-4">Vote for your favourite candidate</h1>
      <div className="flex flex-col items-start gap-4">
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

      {selectedCandidate && (
        <Confirmation candidate={selectedCandidate} />
      )}

    </div>
  )
}