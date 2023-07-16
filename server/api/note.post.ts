import prisma from "../../utils/prisma"
import { z } from "zod"

const payload = z.object({
    userid: z.string(),
    title: z.string(),
    content: z.string(),
    todo: z.string()
})

export default defineEventHandler(async (event) => {
    console.log("post")
    const body = await readBody(event)
    try {
        console.log("body: ", body)
        const val = payload.parse(body)
        await prisma.note.create({
            data: {
                ...val,
                cards: [],
            },
        })
        return "Note Created"
    } catch (error) {
        setResponseStatus(event, 500)
        return error as string
    }
})
