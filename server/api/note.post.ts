import prisma from '../../utils/prisma'
import { z } from 'zod'


const payload = z.object({
    userid: z.string(),
    title: z.string()
})

export default defineEventHandler(async event => {

})