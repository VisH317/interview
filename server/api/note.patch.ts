import prisma from '../../utils/prisma'
import { z } from 'zod'

const payload = z.object({
    id: z.string(),
    content: z.string()
})

export default defineEventHandler(async event => {
    try {
        const body = payload.parse(await readBody(event))

        await prisma.note.update({
            where: { id: body.id },
            data: { content }
        })

        return 'updated successfully'
    } catch (error) {
        throw createError({
            statusCode: 400,
            statusMessage: "Incorrect request body"
        })
    }
})