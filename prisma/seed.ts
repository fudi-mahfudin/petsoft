import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput = {
  email: 'user@example.com',
  hashedPassword: '',
  hasAccess: false,
  pets: {
    create: [
      {
        name: 'Benjamin DB',
        ownerName: 'John Doe',
        imageUrl: 'https://bytegrad.com/course-assets/images/rn-image-4.png',
        age: 2,
        notes:
          "Doesn't like to be touched on the belly. Plays well with other dogs.",
      },
      {
        name: 'Richard',
        ownerName: 'Josephine Dane',
        imageUrl: 'https://bytegrad.com/course-assets/images/rn-image-5.png',
        age: 5,
        notes: 'Needs medication twice a day.',
      },
      {
        name: 'Anna',
        ownerName: 'Frank Doe',
        imageUrl: 'https://bytegrad.com/course-assets/images/rn-image-6.png',
        age: 4,
        notes: 'Allergic to chicken.',
      },
    ],
  },
};

async function main() {
  console.log('Start seeding...');

  const hashedPassword = await bcrypt.hash('password', 10);
  userData.hashedPassword = hashedPassword;

  await prisma.user.create({ data: userData });

  console.log('Seeding finished');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
