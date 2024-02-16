"use client";

import Image from 'next/image'
import Candidate from '@/components/Candidate'
import { useState } from 'react';

export default function Home() {
  const [checkedId, setCheckedId] = useState("");

  const handleChange = (id: string) => {
    setCheckedId(id);
  };

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


  return (
    <span>
      <h1>Vote for your favourite candidate</h1>
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
      <Image
        src="/vercel.svg"
        alt="Vercel Logo"
        width={72}
        height={16}
      />
    </span>
  )
}