import prisma from "../../utils/prisma"

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    console.log("alosifjoaweijflaskdjf")
    if (query.id === null) return { id: "", title: "", content: "", userid: "" }

    const notes = await prisma.note.findMany({
        where: { userid: query.id },
    })

    return notes
})
