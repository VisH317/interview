import prisma from "../../utils/prisma"
import checkUpgraded from "../../utils/checkUpgraded"
import { z } from "zod"

const payload = z.object({
    userid: z.string(),
    title: z.string(),
    content: z.string(),
    todo: z.array(z.string()),
})

export default defineEventHandler(async (event) => {
    console.log("post")
    const body = await readBody(event)

    try {
        const val = payload.parse(body)
        const upgraded = await checkUpgraded(val.userid)
        const notes = await prisma.note.findMany({ where: { userid: val.userid } })
        if(!upgraded && notes.length>=2) {
            setResponseStatus(event, 401)
            return "not allowed"
        }
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
