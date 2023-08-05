import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { z } from "zod"
import chain from "../../utils/quizChain"
import prisma from "../../utils/prisma"
import checkUpgraded from "../../utils/checkUpgraded"

const reqType = z.object({
    userid: z.string(),
    text: z.string(),
})

export default defineEventHandler(async (event) => {
    console.log("test")
    const { text, userid } = reqType.parse(await readBody(event))

    const upgraded = await checkUpgraded(userid)
    const quizzes = await prisma.quiz.findMany({
        where: {
            userid
        }
    })

    if(!upgraded && quizzes.length as number>=5) {
        setResponseStatus(event, 401)
        return "Not authorized"
    }

    const splitter = RecursiveCharacterTextSplitter.fromLanguage("html", {
        chunkSize: 300,
        chunkOverlap: 20,
    })

    const docs = await splitter.createDocuments([text])

    console.log("docs: ", docs)

    const res = await chain.call({
        input_documents: docs,
    })

    const record = await prisma.quiz.create({
        data: {
            date: new Date(),
            questions: res.text.split("\n"),
            answers: [],
            responses: [],
            graded: false,
            userid,
        },
    })
    console.log("splitres: ", res.text.split("\n"))

    return [res.text.split("\n"), record.id]
})
