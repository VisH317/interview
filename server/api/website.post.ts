import { z } from "zod"
import prisma from "../../utils/prisma"

const type = z.object({
    id: z.string(),
    content: z.string(),
})

export default defineEventHandler(async (event) => {
    const { id, content } = type.parse(await readBody(event))
    const note = await prisma.note.findUnique({ where: { id } })
    if (!note)
        throw createError({
            statusCode: 400,
            statusMessage: "note not found",
        })
    const newContent = note?.content + content

    await prisma.note.update({ where: { id }, data: { content: newContent } })

    setResponseStatus(event, 201)
    return "successful"
})
