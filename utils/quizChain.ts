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
    prefix: "Using the following information, create a list of quiz questions on the topic each separated by a newline. You can either create an open ended question with a single line, or a multiple choice question with a line for the question along with a comma-separated list of answers, as well as the correct answer from the choice list. Include a balance of multiple choice and open ended questions. For each question, do not copy text and questions directly from the source document, but instead combine information to create a question of application or other use besides memorization. For example, given a document about C++, you may create open ended questions on how to implement a specific function in the language, or you may ask the best way to write a certain algorithm in the language. For open ended questions, return the type at the start, a semicolon, and then the question. For multiple choice questions, include a comma-separated list that has the type, the question, 4 answer choices separated by commas, and the index of the right answer choice (from 0-3). The document input will be given in HTML format, but do not use any tags as subjects for quiz questions. ",
    suffix: "Document data: {input}\nNumber of Questions: 10\nQuestion Output: ",
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
