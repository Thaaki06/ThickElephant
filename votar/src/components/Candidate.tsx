
// Candidate interface

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
        <div>
            <label htmlFor={id}>
                <input
                    type="checkbox"
                    id={id}
                    checked={checked}
                    onChange={() => onChange(id)}
                />
                {label}
            </label>
            <p>{candidate.firstName} {candidate.lastName}</p>
            <p>{candidate.party}</p>
            <p>{candidate.manifest}</p>
        </div>
    );
};

export default Candidate;
