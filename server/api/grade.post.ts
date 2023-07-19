import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { z } from "zod"
import prisma from "../../utils/prisma"
import chain from "../../utils/openEndedChain"

const Question = z.object({
    type: z.enum(["oe", "mc"]),
    content: z.union([z.string(), z.number()]),
    question: z.string(),
})

const reqType = z.object({
    text: z.string(),
    questions: z.array(Question),
    id: z.string(),
})

interface IOE {
    idx: number
    question: string
}

export default defineEventHandler(async (event) => {
    const { text, questions, id } = reqType.parse(await readBody(event))

    const splitter = RecursiveCharacterTextSplitter.fromLanguage("html", {
        chunkSize: 300,
        chunkOverlap: 20,
    })

    const docs = await splitter.createDocuments([text])

    const responses: string[] = []
    const answers: string[] = []

    const oeQuestions: IOE[] = []

    questions.forEach((q) => {
        if (q.type === "mc") {
            const ans = Number(q.question.split(";")[3].split(":")[1])
            answers.push(String(ans))
            responses.push(String(q.content))
        } else {
            answers.push("")
            responses.push(String(q.content))
            oeQuestions.push({
                idx: answers.length - 1,
                question: `Question: ${
                    q.question.split(";")[1].split(";")[1]
                } Answer: ${q.content}`,
            })
        }
    })

    const res = await chain.call({
        input_documents: docs,
        questions: oeQuestions.map((q) => q.question).join("\n"),
    })

    const oeAnswers: string[] = res.text.split("\n")

    oeQuestions.forEach((q, idx) => {
        answers[q.idx] = oeAnswers[idx]
    })

    console.log("text: ", res.text.split("\n"))

    await prisma.quiz.update({
        where: { id },
        data: {
            answers,
            responses,
            graded: true,
        },
    })

    return res.text.split("\n")
})
