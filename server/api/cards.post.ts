import chain from "../../utils/cardsChain"
import prisma from "../../utils/prisma"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { z } from "zod"

const reqType = z.object({
    id: z.string(),
    text: z.string(),
})

export default defineEventHandler(async (event) => {
    const { text, id } = reqType.parse(await readBody(event))

    const splitter = RecursiveCharacterTextSplitter.fromLanguage("html", {
        chunkSize: 300,
        chunkOverlap: 20,
    })

    const docs = await splitter.createDocuments([text])

    const res = await chain.call({
        input_documents: docs,
    })

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
