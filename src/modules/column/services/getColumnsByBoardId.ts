import { prisma } from "../../../infrastructure/prisma";

export const getColumnsByBoardIdService = async (boardId: string) => {
    const columns = await prisma.column.findMany({
        where: {
            boardId,
        },
    });
    return columns;
};