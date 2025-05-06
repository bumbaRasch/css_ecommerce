import { PrismaClient } from '../generated/prisma';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();
const count = Number(process.argv[2]) || 15;
void (async () => {
  try {
    const customers: { name: string; email: string }[] = Array.from({
      length: count,
    }).map(() => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
    }));

    await prisma.customer.createMany({
      data: customers,
      skipDuplicates: true,
    });

    console.log(`Seed completed: ${count} customers`);
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message, e.stack);
    } else {
      console.error(e);
    }
  } finally {
    await prisma.$disconnect();
  }
})();
