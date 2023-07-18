import prisma from "../../utils/prisma"

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const quiz = await prisma.quiz.findUnique({
        where: { id: query.id as string },
    })
    return quiz
})
