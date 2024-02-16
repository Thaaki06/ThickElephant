"use client";
// Import necessary modules
import Image from 'next/image'
import Candidate from '@/components/Candidate'
import { useState } from 'react';
 
// Define the Home component
export default function Home() {
  // Initialize state to manage the checked candidate ID
  const [checkedId, setCheckedId] = useState("");
 
  // Function to handle checkbox change
  const handleChange = (id: string) => {
    setCheckedId(id);
  };
 
  // Define candidate data
  const candidates = [{
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    party: 'Independent',
    manifest: 'I will make the world a better place'
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Doe',
    party: 'Green Party',
    manifest: 'I will make the world a greener place'
  },
  {
    id: '3',
    firstName: 'Jack',
    lastName: 'Doe',
    party: 'Blue Party',
    manifest: 'I will make the world a bluer place'
  }];
 
  // Return JSX for rendering
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold mb-4">Vote for your favourite candidate</h1>
      {/* Map over candidates and render Candidate components */}
      {candidates.map((candidate) => (
        <Candidate
          key={candidate.id}
          id={candidate.id}
          label={candidate.firstName}
          checked={checkedId === candidate.id}
          onChange={handleChange}
          candidate={candidate}
        />
      ))}
      {/* Render Vercel logo */}
      <button className="bg-black text-white p-2 rounded-md">
        Vote Now
      </button>
    </div>
  )
}
 