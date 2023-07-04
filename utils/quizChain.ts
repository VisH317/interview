/* eslint-disable @typescript-eslint/no-unused-vars */
import { LLMChain, StuffDocumentsChain } from "langchain/chains"
import { PromptTemplate, FewShotPromptTemplate } from "langchain"
import { OpenAI } from "langchain/llms/openai"

const llm = new OpenAI({
    temperature: 0.1,
    modelName: "gpt-3.5-turbo",
    openAIApiKey: process.env.OPENAI_KEY,
})

const examples = [
    {
        documentData:
            "Leonardo DaVinci painted the Mona Lisa\nLeonardo Da Vinci was known for his dramatic and expressive artwork",
        questionOutput:
            "Type: multiple choice; Question: Who painted the Mona Lisa? Answers: Leonardo Da Vinci, Bob Ross, Vincent Van Gogh, Joe Bob; Correct answer index: 0\nType: Open Ended; Question: What was Leonardo Da Vinci known for?",
    },
    {
        documentData:
            "The analytical engine was created by Charles Babbage\nAda Lovelace wrote the first program for the analytical engine",
        questionOutput:
            "Type: open ended; Question: What was Charles Babbages main contribution to computer science?\nType: multiple choice; Question: Who wrote the first program for the analytical engine?; Answers: Bob Joe, Joe Bob, Ada Lovelace, Tim Bob; Correct Answer Index: 2",
    },
]

const exampleFormatterTemplate =
    "document data: {documentData}\n\nQuestion Output: {questionOutput}"
const examplePrompt = new PromptTemplate({
    inputVariables: ["documentData", "questionOutput"],
    template: exampleFormatterTemplate,
})

const prompt = new FewShotPromptTemplate({
    examples,
    examplePrompt,
    prefix: "Using the following information, create a list of quiz questions on the topic each separated by a newline. You can either create an open ended question with a single line, or a multiple choice question with a line for the question along with a comma-separated list of answers, as well as the correct answer from the choice list",
    suffix: "Document data: {input}\nQuestion Output: ",
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
