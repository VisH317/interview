import { z } from "zod"
import prisma from "../../utils/prisma"
import checkUpgraded from "../../utils/checkUpgraded"

const bodyType = z.object({
    id: z.string()
})

export default defineEventHandler(async (event): Promise<boolean> => {
    const { id } = bodyType.parse(await readBody(event))
    return checkUpgraded(id)
})