// Shared Prisma client (one instance for the whole app).
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
