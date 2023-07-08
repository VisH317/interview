import { z } from 'zod'
import prisma from "../../utils/prisma"


const reqType = z.object({
    id: z.string(),
    answers: z.array(z.string())
})


export default defineEventHandler(async (event) => {
    const { id, answers } = reqType.parse(readBody(event))

    await prisma.quiz.update({
        where: { id },
        data: { answers }
    })

    return "successful"
})
