import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { z } from "zod"
import chain from "../../utils/openEndedChain"

const reqType = z.object({
    text: z.string(),
    questions: z.array(z.string()),
})

export default defineEventHandler(async (event) => {
    const { text, questions } = reqType.parse(await readBody(event))

    const splitter = RecursiveCharacterTextSplitter.fromLanguage("html", {
        chunkSize: 300,
        chunkOverlap: 20,
    })

    const docs = await splitter.createDocuments([text])

    const res = await chain.call({
        input_documents: docs,
        questions: questions.join("\n"),
    })

    return res.split("\n")
})
