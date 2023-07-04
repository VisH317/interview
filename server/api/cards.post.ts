// import chain from "../../utils/cardsChain"
// import prisma from "../../utils/prisma"
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
// import { z } from "zod"

// const reqType = z.object({
//     text: z.string(),
// })

// export default defineEventHandler(async (event) => {
//     const { text } = reqType.parse(await readBody())

//     const splitter = RecursiveCharacterTextSplitter.fromLanguage("html", {
//         chunkSize: 300,
//         chunkOverlap: 20,
//     })

//     const docs = await splitter.createDocuments([text])

//     const res = await chain.call({
//         input_documents: docs,
//     })

//     return res
// })
