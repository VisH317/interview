import prisma from '../../utils/prisma'


export default defineEventHandler(async (event) => {
    const { id } = getQuery(event)

    const res = await prisma.flashcard.findMany({
        where: { userid: id },
    })

    return res;
})
