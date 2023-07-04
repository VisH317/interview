import prisma from "../../utils/prisma"

export default defineEventHandler(async (event) => {
    const { id } = getQuery(event)

    const res = await prisma.quiz.findMany({
        where: { userid: id as string },
    })

    return res
})
