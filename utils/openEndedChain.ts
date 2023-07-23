/* eslint-disable @typescript-eslint/no-unused-vars */
import { LLMChain, StuffDocumentsChain } from "langchain/chains"
import { PromptTemplate, FewShotPromptTemplate } from "langchain"
import { OpenAI } from "langchain/llms/openai"

const runtimeConfig = useRuntimeConfig()

const llm = new OpenAI({
    temperature: 0.1,
    modelName: "gpt-3.5-turbo",
    openAIApiKey: runtimeConfig.openaiKey,
})

const examples = [
    {
        documentData:
            "Leonardo DaVinci painted the Mona Lisa\nLeonardo Da Vinci was known for his dramatic and expressive artwork",
        questions:
            "Question: Who Painted the Mona Lisa? Answer: Bob Ross painted the Mona Lisa\nQuestion: What was Leonardo Da Vinci known for? Answer: Leonardo Da Vinci was known for his expressive art style",
        questionOutput: "incorrect: Leonardo Da Vinci painted the Mona Lisa.\ncorrect: Leonardo was known for his expressive art style among many other things, including his dramatic artwork and his inventive mind.",
    },
    {
        documentData:
            "The analytical engine was created by Charles Babbage\nAda Lovelace wrote the first program for the analytical engine",
        questions:
            "Question: What was Charles Babbage's main contribution to computer science? Answer: It was the analytical engine, the first form of the computer\nQuestion: Who wrote the first program for the analytical engine? Answer: Joe Bob did",
        questionOutput:
            "correct: the analytical engine was the precursor to the computer and Babbage's main contribution\nincorrect: Ada Lovelace wrote the first computer program for the analytical engine",
    },
]

const exampleFormatterTemplate =
    "document data: {documentData}\n\nQuestions: {questions}\n\nYour Grading: {questionOutput}"
const examplePrompt = new PromptTemplate({
    inputVariables: ["documentData", "questions", "questionOutput"],
    template: exampleFormatterTemplate,
})

const prompt = new FewShotPromptTemplate({
    examples,
    examplePrompt,
    prefix: "You are a test grader who is grading open-ended questions for validity. You will be provided with a document that contains information for questions that are on the test. You will then receive a list of questions on the test, which consist of a pair of question and a student's answer. Write a newline-separated list that designates the answer for each question as correct and incorrect based on the information in the document (use your own knowledge if not present in the document), and give a short one-sentence explanation of why the following answer is correct or incorrect. Your response for each question should include the word correct or incorrect based on your decision, followed by a colon and then an explanation.",
    suffix: "Document data: {input}\nQuestions: {questions}\nQuestion Output: ",
    inputVariables: ["input", "questions"],
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
