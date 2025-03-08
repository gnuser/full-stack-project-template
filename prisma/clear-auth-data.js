const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  try {
    // Clear all auth tables in appropriate order (respecting foreign key constraints)
    console.log("Clearing Account table...");
    await prisma.account.deleteMany();

    console.log("Clearing Session table...");
    await prisma.session.deleteMany();

    console.log("Clearing VerificationToken table...");
    await prisma.verificationToken.deleteMany();

    console.log("Clearing User table...");
    await prisma.user.deleteMany();

    console.log("Database authentication data cleared successfully");
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
