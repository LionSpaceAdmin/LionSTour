import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

const findImage = (id: string): ImagePlaceholder => {
    const img = PlaceHolderImages.find((p) => p.id === id);
    if (!img) {
        throw new Error(`Placeholder image with id '${id}' not found.`);
    }
    return img;
};


export type GuideReview = {
    id: string;
    author: string;
    avatarUrl: string;
    rating: number;
    text: string;
    date: string;
}

export type Guide = {
    id: string;
    name: string;
    title: string;
    storyHook: string;
    bio: string;
    avatar: ImagePlaceholder;
    heroImage: ImagePlaceholder;
    languages: string[];
    responseTime: string;
    verified: boolean;
    reviews: GuideReview[];
    rating: number;
};

export const mockGuides: Guide[] = [
    {
        id: '1',
        name: 'Amir Cohen',
        title: 'Negev Desert Expert',
        storyHook: 'Former IDF scout, I find spirituality in the silence of the desert and share its hidden secrets.',
        bio: "Amir served for years as a tracker in the desert reconnaissance unit. The Negev isn't just a place for him; it's a part of his soul. He believes that in the vast emptiness, one can find the fullest connection to history, nature, and oneself. His tours are a blend of survival skills, Bedouin lore, and silent, meditative hikes.",
        avatar: findImage('guide-amir'),
        heroImage: findImage('guide-hero-amir'),
        languages: ['Hebrew', 'English'],
        responseTime: '2 hours',
        verified: true,
        rating: 4.9,
        reviews: [
            { id: 'r1', author: 'John D.', avatarUrl: 'https://i.pravatar.cc/48?u=r1', rating: 5, text: "Amir's knowledge is immense. He showed us a side of the desert we never knew existed. Life-changing.", date: '2023-10-15' },
            { id: 'r2', author: 'Sarah K.', avatarUrl: 'https://i.pravatar.cc/48?u=r2', rating: 5, text: "A true spiritual guide. The silent hike at dawn was a highlight of our entire trip to Israel.", date: '2023-09-20' },
        ],
    },
    {
        id: '2',
        name: 'Tamar Levi',
        title: 'Jerusalem Storyteller',
        storyHook: 'I connect the ancient stones of Jerusalem to the vibrant pulse of its modern-day life.',
        bio: 'An archeologist by training and a storyteller by heart, Tamar peels back the layers of Jerusalem like no one else. She avoids the crowded tour bus routes, preferring to lead her groups through hidden alleyways, to rooftops with stunning views, and into the homes of local artisans. For her, every stone has a story, and every person is a living chapter of the city\'s history.',
        avatar: findImage('guide-tamar'),
        heroImage: findImage('guide-hero-tamar'),
        languages: ['Hebrew', 'English', 'French'],
        responseTime: '4 hours',
        verified: true,
        rating: 4.8,
        reviews: [
             { id: 'r3', author: 'Michael B.', avatarUrl: 'https://i.pravatar.cc/48?u=r3', rating: 5, text: "Tamar made Jerusalem come alive. It felt like walking through history with a friend.", date: '2023-11-05' },
        ],
    },
    {
        id: '3',
        name: 'Yoni Goldstein',
        title: 'Galilee & Culinary Guide',
        storyHook: 'From foraging in the Galilee hills to tasting ancient recipes, I tell Israel\'s story through its food.',
        bio: "Yoni is a chef, farmer, and historian all rolled into one. He runs a small organic farm in the Galilee and believes that food is the most direct way to connect with a land and its people. His tours often involve foraging for wild herbs, visiting local wineries and cheese-makers, and culminating in a hands-on cooking workshop where guests prepare a feast based on the day's discoveries.",
        avatar: findImage('guide-yoni'),
        heroImage: findImage('guide-hero-yoni'),
        languages: ['Hebrew', 'English', 'Spanish'],
        responseTime: '1 hour',
        verified: true,
        rating: 5.0,
        reviews: [],
    },
    {
        id: '4',
        name: 'Maya Shaked',
        title: 'Tel Aviv Urban Explorer',
        storyHook: 'I uncover the art, innovation, and hidden communities that make Tel Aviv a city of endless discovery.',
        bio: "A former intelligence officer, Maya now uses her skills to uncover the hidden gems of Tel Aviv's culture. She's deeply connected to the city's art, tech, and social activism scenes. Her tours might take you from a street art tour in Florentin to a meeting with a startup CEO, followed by a tasting at a social-impact cafe. She shows you the city's soul, not just its beaches.",
        avatar: findImage('guide-maya'),
        heroImage: findImage('guide-hero-maya'),
        languages: ['Hebrew', 'English'],
        responseTime: '3 hours',
        verified: true,
        rating: 4.7,
        reviews: [],
    },
     {
        id: '5',
        name: 'David Bar-On',
        title: 'Golan Heights Adventurer',
        storyHook: 'From ancient battlefields to modern vineyards, the Golan tells a story of resilience I\'m proud to share.',
        bio: 'David grew up in a kibbutz on the Golan Heights and served in an armored corps. His connection to the land is deep and personal. He combines thrilling jeep tours along old patrol roads with visits to boutique wineries, ancient synagogues, and strategic lookouts. He tells the story of the Golan with a perspective that is both historical and deeply personal.',
        avatar: findImage('guide-david'),
        heroImage: findImage('guide-hero-david'),
        languages: ['Hebrew', 'English', 'Russian'],
        responseTime: '5 hours',
        verified: true,
        rating: 4.9,
        reviews: [],
    },
    {
        id: '6',
        name: 'Noa Rosen',
        title: 'Coastal Plain Historian',
        storyHook: 'I walk the line between Crusaders\' castles and high-tech hubs, exploring 3,000 years of history.',
        bio: "Noa is a PhD in history who specializes in the coastal cities of Israel. She can show you the layers of Caesarea, from Herod's Roman port to the modern tech park, or guide you through the ancient alleys of Akko. She has a unique talent for connecting the dots of history, showing how ancient trade routes have become today's fiber-optic highways.",
        avatar: findImage('guide-noa'),
        heroImage: findImage('guide-hero-noa'),
        languages: ['Hebrew', 'English'],
        responseTime: '2 hours',
        verified: true,
        rating: 4.8,
        reviews: [],
    },
]
