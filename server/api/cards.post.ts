import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { z } from "zod"
import chain from "../../utils/cardsChain"
import prisma from "../../utils/prisma"
import checkUpgraded from "../../utils/checkUpgraded"

const reqType = z.object({
    userid: z.string(),
    id: z.string(),
    text: z.string(),
})

export default defineEventHandler(async (event) => {
    const { text, id, userid } = reqType.parse(await readBody(event))

    console.log("cards post")

    const upgraded = await checkUpgraded(userid)
    console.log("upgraded: ", upgraded)

    const note = await prisma.note.findUnique({
        where: {
            id,
        },
    })

    if (!upgraded && (note?.cards.length as number) >= 50) {
        setResponseStatus(event, 401)
        return "No more flashcards allowed"
    }

    const splitter = RecursiveCharacterTextSplitter.fromLanguage("html", {
        chunkSize: 300,
        chunkOverlap: 20,
    })

    const docs = await splitter.createDocuments([text])

    const res = await chain.call({
        input_documents: docs,
    })

    console.log("res called")

    if (res.text.split("\n")[1].split(":").length < 2) {
        throw createError({
            statusCode: 400,
            statusMessage: "No Information Provided",
        })
    }

    await prisma.note.update({
        where: { id },
        data: {
            cards: res.text.split("\n"),
        },
    })

    return res.text.split("\n")
})
