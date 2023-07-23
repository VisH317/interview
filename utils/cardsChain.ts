/* eslint-disable @typescript-eslint/no-unused-vars */
import { LLMChain, StuffDocumentsChain } from "langchain/chains"
import { PromptTemplate, FewShotPromptTemplate } from "langchain"
import { OpenAI } from "langchain/llms/openai"

const runtimeConfig = useRuntimeConfig()

const llm = new OpenAI({
    temperature: 0.7,
    modelName: "gpt-3.5-turbo",
    openAIApiKey: runtimeConfig.openaiKey,
})

const examples = [
    {
        documentData:
            "Leonardo DaVinci painted the Mona Lisa\nLeonardo Da Vinci was known for his dramatic and expressive artwork\nVincent Van Gogh was a close collaborator of Da Vinci",
        questionOutput:
            "Leonardo Da Vinci: painter of the Mona Lisa, Vincent Van Gogh: Worked with Leonardo Da Vinci",
    },
    {
        documentData:
            "The analytical engine was created by Charles Babbage\nAda Lovelace wrote the first program for the analytical engine",
        questionOutput:
            "Charles Babbage: creator of the analytical engine\nAda Lovelace: first programmer of the analytical engine",
    },
]

const exampleFormatterTemplate =
    "document data: {documentData}\nFlashcards: {questionOutput}"
const examplePrompt = new PromptTemplate({
    inputVariables: ["documentData", "questionOutput"],
    template: exampleFormatterTemplate,
})

const prompt = new FewShotPromptTemplate({
    examples,
    examplePrompt,
    prefix: "Using the following information, create a list of flashcards that represent key terms in the provided input document. Your output should contain a list of key value pairs separated by newlines. Each key value pair includes a term as the key and a description or answer for that term as the value. The key should only be 1-4 words long and only a subject, while the value should be a maximum of 2-3 sentences in length. If necessary, combine and analyze the provided information to create key value pairs on broader topics, or look for specific details to make specific flashcards. The key and value in the flashcard should be separated by a colon. Extract information based on its presence and only extract key terms with clear definitions from the document. Do not make up information on your own.",
    suffix: "Document data: {input}\nFlashcards: ",
    inputVariables: ["input"],
    exampleSeparator: "\n\n\n",
    templateFormat: "f-string",
})

// this is the individual documents prompt
const llmChain = new LLMChain({ prompt, llm })

const chain = new StuffDocumentsChain({
    llmChain,
    documentVariableName: "input",
})

export default chain
