

"use client";

import React, { use } from 'react'

import { useState, useEffect } from "react";

import database from "@/util/database";
import { Vote } from "@/models/vote";
import { Voter } from "@/models/voter"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import candidates from '@/constants/candidates';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const resultspg = () => {

  const [votes, setVotes] = useState<Vote[]>([]);
  const [voters, setVoters] = useState<Voter[]>([]);

  useEffect(() => {
    fetchVotes();
    fetchVoters();
  }, []);

  async function fetchVotes() {
    const votes = await database.getVotes();
    setVotes(votes);
  }

  async function fetchVoters() {
    const voters = await database.getVoters();
    setVoters(voters)
  }

  const getTotalVotes = () => {
    return votes.length;
  }

  const getVotesByParty = () => {
    const partyIds: { [key: string]: number } = {}; // Add index signature to allow indexing with a string
    for (const { party_id } of votes) { // Access 'votes' state variable
      partyIds[party_id] = (partyIds[party_id] || 0) + 1;
    }
    return partyIds; // Return the calculated result
  }





  const getPercentageOfVotesByParty = () => {
    const totalVotes = getTotalVotes();
    const votesByParty = getVotesByParty();
    const percentageByParty: { [key: string]: number } = {};

    for (const partyId in votesByParty) {
      percentageByParty[partyId] = (votesByParty[partyId] / totalVotes) * 100;
    }

    return percentageByParty;
  }








  const getVotesByProvince = () => {
    const provinceIds: { [key: string]: number } = {}; // Add index signature to allow indexing with a string
    for (const { voter } of votes) { // Access 'votes' state variable
      provinceIds[voter.province] = (provinceIds[voter.province] || 0) + 1;
    }
    return provinceIds; // Return the calculated result
  }

  const getVotesByPartyAndProvince = () => {
    const partyAndProvinceIds: { [key: string]: { [key: string]: number } } = {}; // Add index signature to allow indexing with a string
    for (const { party_id, voter } of votes) { // Access 'votes' state variable
      partyAndProvinceIds[party_id] = partyAndProvinceIds[party_id] || {};
      partyAndProvinceIds[party_id][voter.province] = (partyAndProvinceIds[party_id][voter.province] || 0) + 1;
    }
    return partyAndProvinceIds; // Return the calculated result
  }

  const getBarChartDataAndOptionsForStacked = () => {
    const parties = Object.keys(getVotesByPartyAndProvince());
    const partyList = parties.map(index => candidates[index]?.party);
    const provinces = new Set(); // Using a set to collect unique provinces
    parties.forEach((partyId) => {
      Object.keys(getVotesByPartyAndProvince()[partyId]).forEach((province) => {
        provinces.add(province); // Add province to set
      });
    });
    const uniqueProvinces = Array.from(provinces); // Convert set to array
    const colors = [
  'rgba(255,  99,  132,  0.5)', // Darker red
  'rgba(54,  162,  235,  0.5)', // Darker blue
  'rgba(255,  206,  86,  0.5)', // Darker yellow
  'rgba(75,  192,  192,  0.5)', // Darker teal
  'rgba(153,  102,  255,  0.5)', // Darker purple
  'rgba(255,  159,  64,  0.5)', // Darker orange
];

    const colorMap = {}; // Map to store colors for each province
    uniqueProvinces.forEach((province, index) => {
      colorMap[province] = colors[index % colors.length]; // Assign color to province
    });
    

    

    const data = {
      labels: partyList,
      datasets: uniqueProvinces.map((province) => ({
        label: province,
        data: parties.map((partyId) => getVotesByPartyAndProvince()[partyId][province] || 0), // Fill in 0 for parties with no presence in the province
        backgroundColor: parties.map((partyId) => colorMap[province]), // Use color from color map
        borderColor: 'rgba(0, 0, 0, 1)', // Border color for bars
        borderWidth: 1,
      })),
    };

    const options = {
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              const totalVotes = getTotalVotes();
              const dataIndex = context.dataIndex;
              const value = context.dataset.data[dataIndex];
              const percentage = ((value / totalVotes) * 100).toFixed(2);
              return `${context.dataset.label}: ${value} (${percentage}%)`;
            }
          }
        }
      }
    };

    return { data, options };
  };


  const getBarChartDataAndOptions = () => {
    const parties = Object.keys(getVotesByParty());
    const partyList = parties.map(index => candidates[index]?.party);
    console.log(partyList);

    const data = {
      labels: partyList,
      datasets: [
        {
          label: 'Votes by Party',
          data: Object.values(getVotesByParty()),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              const totalVotes = getTotalVotes();
              const dataIndex = context.dataIndex;
              const value = context.dataset.data[dataIndex];
              const percentage = ((value / totalVotes) * 100).toFixed(2);
              return `${context.dataset.label}: ${value} (${percentage}%)`;
            }
          }
        }
      }
    };

    return { data, options };
  }

  return (
    //items-center
      <div className="flex flex-col justify-center p-8"> 
        <section className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Election Results</h1>
    
          <h2 className="text-2xl font-semibold mb-2">Overall Voting Results</h2>
          <p className="mb-4">Percentage of users voted: {(votes.length / voters.length *   100).toFixed(2)}%</p>
          <p className="mb-4">Total votes: {getTotalVotes()}</p>
        </section>
    <div className="grid grid-cols-3 gap-3">
        <section className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2">Results by Party</h2>
          {
            Object.entries(getVotesByParty()).map(([partyId, votes]) => (
              <p key={partyId} className="mb-2">{candidates[partyId]?.party}: {votes} votes</p>
            ))
          }
        </section>
    
        <section className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2">Results by Province</h2>
          {
            Object.entries(getVotesByProvince()).map(([province, votes]) => (
              <p key={province} className="mb-2">{province}: {votes} votes</p>
            ))
          }
        </section>
    
        <section className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2">Results by Party (Percentage)</h2>
          {
            Object.entries(getPercentageOfVotesByParty()).map(([partyId, percentage]) => (
              <p key={partyId} className="mb-2">{candidates[partyId]?.party}: {percentage.toFixed(2)}%</p>
            ))
          }
        </section>
        </div>

        
        
       
    
        <section className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2">Voting Distribution</h2>
          <Bar data={getBarChartDataAndOptions().data} options={getBarChartDataAndOptions().options} />
        </section>
    
        <section className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2">Voting Distribution by Party and Province</h2>
          <Bar data={getBarChartDataAndOptionsForStacked().data} options={getBarChartDataAndOptionsForStacked().options} />
        </section>

        <section className="text-center mb-8">
  <h2 className="text-2xl font-semibold mb-2">Results by Party and Province</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {
      Object.entries(getVotesByPartyAndProvince()).map(([partyId, votesByProvince]) => (
        <div key={partyId} className="mb-4">
          <h3 className="text-xl font-semibold mb-2">{candidates[partyId]?.party}</h3>
          {
            Object.entries(votesByProvince).map(([province, votes]) => (
              <p key={province} className="mb-2">{province}: {votes} votes</p>
            ))
          }
        </div>
      ))
    }
  </div>
</section>
      </div>

    );
};
export default resultspg