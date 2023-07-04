import prisma from "../../utils/prisma"

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const note = await prisma.note.findUnique({
        where: { id: query.id as string },
    })
    return note
})
