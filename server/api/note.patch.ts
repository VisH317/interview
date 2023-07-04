import prisma from "../../utils/prisma"
import { z } from "zod"

const payload = z.object({
    id: z.string(),
    content: z.string(),
})

export default defineEventHandler(async (event) => {
    const { id, content } = payload.parse(await readBody(event))

    await prisma.note.update({
        where: { id },
        data: { content },
    })

    return "updated successfully"
})
