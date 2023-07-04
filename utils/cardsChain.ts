/* eslint-disable @typescript-eslint/no-unused-vars */
import { LLMChain, StuffDocumentsChain } from "langchain/chains"
import { PromptTemplate, FewShotPromptTemplate } from "langchain"
import { OpenAIChat } from "langchain/dist/llms/openai-chat"

const llm = new OpenAIChat({ temperature: 0.1 })

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
            "Charles Babbage: creator of the analytical engine, Ada Lovelace: first programmer of the analytical engine",
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
    prefix: "Using the following information, create a list of flashcards that represent key terms in the provided input document. Your output should contain a list of key value pairs separated by commas. Each key value pair includes a term as the key and a description or answer for that term as the value.",
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
