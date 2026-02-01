import { PrismaClient, Prisma } from '../generated/prisma';

export const prisma = new PrismaClient();

export type PrismaClientOrTransaction = PrismaClient | Prisma.TransactionClient;
