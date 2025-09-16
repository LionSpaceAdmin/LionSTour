import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

const findImage = (seed: string): ImagePlaceholder => {
    // This is a mock function, in a real app you'd fetch or have a more robust system
    return {
      id: seed,
      description: `Portrait of guide ${seed}`,
      imageUrl: `https://picsum.photos/seed/guide-${seed}/400/400`,
      imageHint: 'portrait person',
    };
  };

export type Guide = {
    id: string;
    name: string;
    title: string;
    storyHook: string;
    avatar: ImagePlaceholder;
    languages: string[];
    responseTime: string;
    verified: boolean;
};

export const mockGuides: Guide[] = [
    {
        id: '1',
        name: 'Amir Cohen',
        title: 'Negev Desert Expert',
        storyHook: 'Former IDF scout, I find spirituality in the silence of the desert and share its hidden secrets.',
        avatar: findImage('amir'),
        languages: ['Hebrew', 'English'],
        responseTime: '2 hours',
        verified: true,
    },
    {
        id: '2',
        name: 'Tamar Levi',
        title: 'Jerusalem Storyteller',
        storyHook: 'I connect the ancient stones of Jerusalem to the vibrant pulse of its modern-day life.',
        avatar: findImage('tamar'),
        languages: ['Hebrew', 'English', 'French'],
        responseTime: '4 hours',
        verified: true,
    },
    {
        id: '3',
        name: 'Yoni Goldstein',
        title: 'Galilee & Culinary Guide',
        storyHook: 'From foraging in the Galilee hills to tasting ancient recipes, I tell Israel\'s story through its food.',
        avatar: findImage('yoni'),
        languages: ['Hebrew', 'English', 'Spanish'],
        responseTime: '1 hour',
        verified: true,
    },
    {
        id: '4',
        name: 'Maya Shaked',
        title: 'Tel Aviv Urban Explorer',
        storyHook: 'I uncover the art, innovation, and hidden communities that make Tel Aviv a city of endless discovery.',
        avatar: findImage('maya'),
        languages: ['Hebrew', 'English'],
        responseTime: '3 hours',
        verified: true,
    },
     {
        id: '5',
        name: 'David Bar-On',
        title: 'Golan Heights Adventurer',
        storyHook: 'From ancient battlefields to modern vineyards, the Golan tells a story of resilience I\'m proud to share.',
        avatar: findImage('david'),
        languages: ['Hebrew', 'English', 'Russian'],
        responseTime: '5 hours',
        verified: true,
    },
    {
        id: '6',
        name: 'Noa Rosen',
        title: 'Coastal Plain Historian',
        storyHook: 'I walk the line between Crusaders\' castles and high-tech hubs, exploring 3,000 years of history.',
        avatar: findImage('noa'),
        languages: ['Hebrew', 'English'],
        responseTime: '2 hours',
        verified: true,
    },
]
