import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { z } from "zod"
import chain from "../../utils/quizChain"
import prisma from "../../utils/prisma"

const reqType = z.object({
    userid: z.string()
    text: z.string(),
})

export default defineEventHandler(async (event) => {
    console.log("test")
    const { text, userid } = reqType.parse(await readBody(event))

    console.log("text: ", text)

    const splitter = RecursiveCharacterTextSplitter.fromLanguage("html", {
        chunkSize: 300,
        chunkOverlap: 20,
    })

    const docs = await splitter.createDocuments([text])

    console.log("docs: ", docs)

    const res = await chain.call({
        input_documents: docs,
    })

    await prisma.quiz.create({
        data: {
            date: Date.now(),
            questions: res.split("\n"),
            answers: [],
            graded: false,
            userid,
        }
    })

    console.log("res: ", res)
    console.log("splitres: ", res.split("\n"))

    return res.split("\n")
})
