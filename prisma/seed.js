// Seeds a few users and posts so the endpoints have data to work with.
// Run with: npm run seed
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.vote.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const alice = await prisma.user.create({ data: { username: "alice" } });
  const bob = await prisma.user.create({ data: { username: "bob" } });

  await prisma.post.createMany({
    data: [
      { title: "Intro to Redis", url: "https://redis.io", authorId: alice.id },
      { title: "PostgreSQL indexing", url: "https://www.postgresql.org", authorId: bob.id },
      { title: "Prisma transactions", url: "https://www.prisma.io", authorId: alice.id },
    ],
  });

  console.log("Seeded users:", alice.username, bob.username);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
