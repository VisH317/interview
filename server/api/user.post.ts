import { z } from "zod"
import prisma from "../../utils/prisma"

const bodyType = z.object({
    id: z.string()
})

export default defineEventHandler(async (event) => {
    const { id } = bodyType.parse(await readBody(event))
    await prisma.user.create({
        data: {
            id,
            upgraded: false
        }
    })

    setResponseStatus(event, 201)
    return "user created successfully"
})