import { object } from "zod"
import prisma from "../../utils/prisma"

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    console.log("awioejfoaidsfj: ", query.id)
    // if(!('id ' in query)) return "No note exists"
    const err = await prisma.note.delete({ where: { id: query.id as string } })
    console.log("err: ", err)
    return "Deleted successfully"
})
