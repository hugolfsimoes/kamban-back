import { PrismaClient } from "../../../../generated/prisma";
import { ColumnDTO, IColumnRepository } from "../IColumnRepository";

export class PrismaColumnRepository implements IColumnRepository {
    constructor(private prisma: PrismaClient) {}

    async findManyByBoardId(boardId: string): Promise<ColumnDTO[]> {
        return this.prisma.column.findMany({
            where: { boardId },
            select: { id: true, title: true, position: true },
            orderBy: { position: 'asc' }
        });
    }
}