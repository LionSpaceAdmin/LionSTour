import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

export type Experience = {
  id: string;
  title: string;
  storyHook: string;
  duration: number; // in days
  difficulty: 'easy' | 'moderate' | 'challenging';
  familyFriendly: boolean;
  image: ImagePlaceholder;
};

const findImage = (id: string): ImagePlaceholder => {
  const img = PlaceHolderImages.find((p) => p.id === id);
  if (!img) {
    // Fallback in case image is not found
    return {
      id: 'fallback',
      description: 'Fallback image',
      imageUrl: `https://picsum.photos/seed/${id}/1200/900`,
      imageHint: 'placeholder',
    };
  }
  return img;
};


export const mockExperiences: Experience[] = [
  {
    id: '1',
    title: 'Healing in the Galilee',
    storyHook: 'Reconnect with nature and yourself in the serene landscapes of northern Israel.',
    duration: 3,
    difficulty: 'easy',
    familyFriendly: true,
    image: findImage('experience-5'),
  },
  {
    id: '2',
    title: 'Desert Soul',
    storyHook: 'Discover the stark beauty and ancient secrets of the Negev desert.',
    duration: 2,
    difficulty: 'moderate',
    familyFriendly: false,
    image: findImage('experience-1'),
  },
  {
    id: '3',
    title: 'Jerusalem Unveiled',
    storyHook: 'Walk through millennia of history in the heart of the world.',
    duration: 4,
    difficulty: 'moderate',
    familyFriendly: true,
    image: findImage('experience-2'),
  },
  {
    id: '4',
    title: 'Tel Aviv Pulse',
    storyHook: 'Dive into the vibrant culture, cuisine, and nightlife of the city that never sleeps.',
    duration: 3,
    difficulty: 'easy',
    familyFriendly: true,
    image: findImage('experience-3'),
  },
  {
    id: '5',
    title: 'Coastal Wonders',
    storyHook: 'From ancient ports to modern beaches, explore Israel\'s Mediterranean magic.',
    duration: 5,
    difficulty: 'easy',
    familyFriendly: true,
    image: findImage('experience-4'),
  },
  {
    id: '6',
    title: 'Carmel Forest Escape',
    storyHook: 'Breathe deep and find adventure in the green heart of the Carmel mountains.',
    duration: 2,
    difficulty: 'moderate',
    familyFriendly: true,
    image: findImage('experience-6'),
  },
];
