import prisma from '../../utils/prisma'
import { z } from 'zod'


const payload = z.object({
    userid: z.string(),
    title: z.string()
})

export default defineEventHandler(async event => {
    const body = await readBody(event)
    try { 
        const val = payload.parse(body) 
        await prisma.note.create({
            data: val
        })

    } catch (error) { 
        setResponseStatus(event, 500)
        return
    }

})