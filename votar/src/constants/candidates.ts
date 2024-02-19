import {Candidate} from "@/models/candidate"

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

export default candidates;