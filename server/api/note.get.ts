import prisma from '../../utils/prisma'


export default defineEventHandler(async event => {
    const query = getQuery(event)
    const notes = await prisma.note.findMany({
        where: { userid: query.id }
    })

    return notes
})
