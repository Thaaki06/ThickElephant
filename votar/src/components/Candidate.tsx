
import React from 'react';
 
interface Candidate {
    id: string;
    firstName: string;
    lastName: string;
    party: string;
    manifest: string;
}
 
interface CandidateProps {
    id: string;
    label: string;
    checked: boolean;
    onChange: (id: string) => void;
    candidate: Candidate;
}
 
const Candidate = ({ id, label, checked, onChange, candidate }: CandidateProps) => {
    return (
        <div className="border shadow-lg rounded-lg p-4 max-w-md">
            <label htmlFor={id} className="flex items-center space-x-2 cursor-pointer">
                <input
                    type="checkbox"
                    id={id}
                    checked={checked}
                    onChange={() => onChange(id)}
                    className="w-6 h-6 rounded-full border-2 border-gray-400 focus:outline-none focus:border-blue-500"
                />
                <span className="text-lg font-semibold">{label}</span>
            </label>
            <div className="flex flex-row space-x-4">
                <p>{candidate.firstName}</p>
                <p>{candidate.lastName}</p>
                <p>{candidate.party}</p>
                <p>{candidate.manifest}</p>
            </div>
        </div>
    );
};
 
export default Candidate;
 