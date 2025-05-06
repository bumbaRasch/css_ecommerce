import { PrismaClient } from '../generated/prisma';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();
const count = Number(process.argv[2]) || 15;
void (async () => {
  try {
    const products: { name: string; description: string; price: number }[] =
      Array.from({ length: count }).map(() => ({
        name: String(faker.commerce.productName()),
        description: String(faker.commerce.productDescription()),
        price: parseFloat(String(faker.commerce.price({ min: 10, max: 1000 }))),
      }));

    await prisma.product.createMany({
      data: products,
      skipDuplicates: true,
    });

    console.log(`Seed completed: ${count} products`);
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
