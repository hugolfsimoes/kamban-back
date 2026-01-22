import { PrismaClient } from "../../../../generated/prisma";
import { CardDTO, ICardRepository } from "../ICardRepository";

export class PrismaCardRepository implements ICardRepository {
    constructor(private prisma: PrismaClient) { }

    async findManyByColumnId(columnId: string): Promise<CardDTO[]> {
        return this.prisma.card.findMany({
            where: { columnId },
            select: {
                id: true,
                title: true,
                description: true,
                columnId: true,
                position: true,
                creatorId: true,
                createdAt: true,
                updatedAt: true
            },
        });
    }
}
