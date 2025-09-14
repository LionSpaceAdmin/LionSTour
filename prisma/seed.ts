import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create sample guide
  const guide = await prisma.guide.create({
    data: {
      name: 'David Cohen',
      email: 'david.cohen@example.com',
      bio: 'Former IDF officer turned tour guide, specializing in military history and Jerusalem.',
      isVeteran: true,
      languages: ['en', 'he'],
      specialties: ['history', 'military', 'jerusalem'],
      rating: 4.8,
      isActive: true,
    },
  });

  // Create sample experience
  const experience = await prisma.experience.create({
    data: {
      title: 'Jerusalem Old City Historical Tour',
      description: 'Explore the ancient streets of Jerusalem with a veteran guide who knows every stone and story.',
      duration: 180, // 3 hours
      price: 15000, // $150 in cents
      maxGuests: 8,
      category: 'historical',
      location: 'Jerusalem Old City',
      latitude: 31.7767,
      longitude: 35.2345,
      images: ['/images/jerusalem-old-city.jpg'],
      guideId: guide.id,
    },
  });

  // Create sample admin user
  const admin = await prisma.user.create({
    data: {
      email: 'admin@lionstour.com',
      name: 'LionSTour Admin',
      role: 'ADMIN',
    },
  });

  console.log('✅ Database seeded successfully!');
  console.log(`Created guide: ${guide.name}`);
  console.log(`Created experience: ${experience.title}`);
  console.log(`Created admin user: ${admin.email}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });