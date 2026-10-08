export interface Pet {
  id: string;
  name: string;
  type: 'dog' | 'cat' | 'rabbit' | 'bird' | 'small-animal';
  breed: string;
  age: 'puppy' | 'young' | 'adult' | 'senior';
  gender: 'male' | 'female';
  size: 'small' | 'medium' | 'large';
  color: string;
  description: string;
  personality: string[];
  goodWith: string[];
  medicalInfo: string;
  adoptionFee: number;
  images: string[];
  isFeatured: boolean;
  dateAdded: string;
  location: string;
}

// Simulated database of pets
export const pets: Pet[] = [
  {
    id: 'dog-1',
    name: 'Buddy',
    type: 'dog',
    breed: 'Golden Retriever',
    age: 'young',
    gender: 'male',
    size: 'large',
    color: 'Golden',
    description: 'Buddy is a friendly and energetic Golden Retriever who loves to play fetch and go for long walks. He\'s great with children and other dogs, making him the perfect family companion.',
    personality: ['Friendly', 'Energetic', 'Loyal', 'Playful'],
    goodWith: ['Children', 'Dogs', 'Active families'],
    medicalInfo: 'Neutered, vaccinated, and microchipped. No known health issues.',
    adoptionFee: 250,
    images: [
      'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg',
      'https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg'
    ],
    isFeatured: true,
    dateAdded: '2025-02-15',
    location: 'Main Shelter'
  },
  {
    id: 'cat-1',
    name: 'Luna',
    type: 'cat',
    breed: 'Domestic Shorthair',
    age: 'young',
    gender: 'female',
    size: 'medium',
    color: 'Black and White',
    description: 'Luna is a sweet and affectionate cat who loves to cuddle on the couch. She\'s quiet and gentle, making her perfect for a calm household. Luna enjoys playing with string toys and basking in sunny spots.',
    personality: ['Affectionate', 'Gentle', 'Quiet', 'Independent'],
    goodWith: ['Adults', 'Seniors', 'Calm households'],
    medicalInfo: 'Spayed, vaccinated, and microchipped. No known health issues.',
    adoptionFee: 150,
    images: [
      'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
      'https://images.pexels.com/photos/1183434/pexels-photo-1183434.jpeg'
    ],
    isFeatured: true,
    dateAdded: '2025-03-05',
    location: 'Foster Home'
  },
  {
    id: 'dog-2',
    name: 'Max',
    type: 'dog',
    breed: 'Labrador Mix',
    age: 'adult',
    gender: 'male',
    size: 'large',
    color: 'Chocolate',
    description: 'Max is a well-trained Labrador mix with a gentle demeanor. He loves swimming, hiking, and spending time outdoors. He\'s great with kids and would make an excellent addition to an active family.',
    personality: ['Intelligent', 'Well-trained', 'Active', 'Gentle'],
    goodWith: ['Children', 'Dogs', 'Active families'],
    medicalInfo: 'Neutered, vaccinated, and microchipped. Mild arthritis managed with joint supplements.',
    adoptionFee: 200,
    images: [
      'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg',
      'https://images.pexels.com/photos/2623968/pexels-photo-2623968.jpeg'
    ],
    isFeatured: false,
    dateAdded: '2025-03-10',
    location: 'Main Shelter'
  },
  {
    id: 'cat-2',
    name: 'Oliver',
    type: 'cat',
    breed: 'Maine Coon Mix',
    age: 'adult',
    gender: 'male',
    size: 'large',
    color: 'Orange Tabby',
    description: 'Oliver is a majestic Maine Coon mix with a fluffy coat and friendly personality. He enjoys being brushed and will follow you around the house like a shadow. Oliver gets along with respectful children and other pets.',
    personality: ['Friendly', 'Sociable', 'Curious', 'Gentle'],
    goodWith: ['Children', 'Cats', 'Dogs', 'Families'],
    medicalInfo: 'Neutered, vaccinated, and microchipped. Regular grooming required for his long coat.',
    adoptionFee: 175,
    images: [
      'https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg',
      'https://images.pexels.com/photos/2061057/pexels-photo-2061057.jpeg'
    ],
    isFeatured: true,
    dateAdded: '2025-02-28',
    location: 'Foster Home'
  },
  {
    id: 'rabbit-1',
    name: 'Thumper',
    type: 'rabbit',
    breed: 'Holland Lop',
    age: 'young',
    gender: 'male',
    size: 'small',
    color: 'Brown and White',
    description: 'Thumper is an adorable Holland Lop rabbit who loves to hop around and explore. He enjoys fresh vegetables and being petted gently. Thumper would do well in a home with rabbit experience.',
    personality: ['Curious', 'Gentle', 'Playful', 'Social'],
    goodWith: ['Adults', 'Calm children', 'Quiet households'],
    medicalInfo: 'Neutered, vaccinated. Requires regular nail trims and dental checks.',
    adoptionFee: 100,
    images: [
      'https://images.pexels.com/photos/4588065/pexels-photo-4588065.jpeg',
      'https://images.pexels.com/photos/6846041/pexels-photo-6846041.jpeg'
    ],
    isFeatured: false,
    dateAdded: '2025-03-15',
    location: 'Small Animal Room'
  },
  {
    id: 'dog-3',
    name: 'Bella',
    type: 'dog',
    breed: 'Beagle Mix',
    age: 'adult',
    gender: 'female',
    size: 'medium',
    color: 'Tricolor',
    description: 'Bella is a sweet Beagle mix with a nose for adventure. She loves going for walks, playing fetch, and cuddling on the couch. Bella gets along with everyone she meets and would thrive in an active household.',
    personality: ['Friendly', 'Curious', 'Energetic', 'Affectionate'],
    goodWith: ['Children', 'Dogs', 'Active families'],
    medicalInfo: 'Spayed, vaccinated, and microchipped. No known health issues.',
    adoptionFee: 225,
    images: [
      'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg',
      'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg'
    ],
    isFeatured: false,
    dateAdded: '2025-03-18',
    location: 'Main Shelter'
  },
  {
    id: 'cat-3',
    name: 'Whiskers',
    type: 'cat',
    breed: 'Siamese Mix',
    age: 'senior',
    gender: 'female',
    size: 'medium',
    color: 'Seal Point',
    description: 'Whiskers is a sweet senior Siamese mix looking for a quiet home to spend her golden years. She enjoys gentle pets, warm laps, and sunny windowsills. Whiskers would be perfect for someone seeking a low-energy companion.',
    personality: ['Calm', 'Affectionate', 'Gentle', 'Independent'],
    goodWith: ['Adults', 'Seniors', 'Quiet households'],
    medicalInfo: 'Spayed, vaccinated, and microchipped. On senior cat food for kidney health.',
    adoptionFee: 100,
    images: [
      'https://images.pexels.com/photos/991831/pexels-photo-991831.jpeg',
      'https://images.pexels.com/photos/1276553/pexels-photo-1276553.jpeg'
    ],
    isFeatured: false,
    dateAdded: '2025-03-01',
    location: 'Senior Cat Room'
  },
  {
    id: 'bird-1',
    name: 'Sky',
    type: 'bird',
    breed: 'Budgie',
    age: 'young',
    gender: 'male',
    size: 'small',
    color: 'Blue and White',
    description: 'Sky is a vibrant blue budgie who loves to chirp and sing. He\'s learning to step up onto fingers and enjoys flying around in a safe, enclosed space. Sky would make a delightful companion for a bird enthusiast.',
    personality: ['Vocal', 'Active', 'Curious', 'Playful'],
    goodWith: ['Adults', 'Experienced bird owners'],
    medicalInfo: 'Health checked by avian vet. Currently on a seed and pellet diet.',
    adoptionFee: 75,
    images: [
      'https://images.pexels.com/photos/1230484/pexels-photo-1230484.jpeg',
      'https://images.pexels.com/photos/236355/pexels-photo-236355.jpeg'
    ],
    isFeatured: false,
    dateAdded: '2025-03-12',
    location: 'Bird Room'
  }
];

export const successStories = [
  {
    id: 'story-1',
    petName: 'Rocky',
    petType: 'dog',
    adopter: 'The Johnson Family',
    date: 'January 2025',
    image: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg',
    title: 'From Shelter to Loving Home',
    story: 'Rocky was with us for almost 6 months before finding his forever home with the Johnson family. Now, he enjoys daily walks in the park, has a huge backyard to play in, and even sleeps on the bed with his new human siblings. The Johnsons tell us that adopting Rocky was one of the best decisions they ever made!',
  },
  {
    id: 'story-2',
    petName: 'Mittens',
    petType: 'cat',
    adopter: 'Sarah Williams',
    date: 'February 2025',
    image: 'https://images.pexels.com/photos/991831/pexels-photo-991831.jpeg',
    title: 'A Perfect Companion',
    story: 'Sarah was looking for a companion after moving to a new city for work. When she met Mittens, it was love at first sight. Now Mittens greets Sarah at the door every day after work and keeps her company during movie nights. Sarah says her apartment finally feels like home with Mittens around.',
  },
  {
    id: 'story-3',
    petName: 'Daisy & Duke',
    petType: 'rabbit',
    adopter: 'The Martinez Family',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/4588065/pexels-photo-4588065.jpeg',
    title: 'Double the Love',
    story: 'The Martinez family adopted bonded pair Daisy and Duke after their children learned about caring for animals in school. The bunnies now have a custom-built habitat in the family room and get plenty of supervised time to hop around. The children have learned responsibility through caring for their new pets, and the bunnies are thriving with all the attention and love.',
  }
];