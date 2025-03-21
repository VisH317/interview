import { Configuration, OpenAIApi, ResponseTypes } from "openai-edge"
import { z } from "zod"

const runtimeConfig = useRuntimeConfig()

const openai = new OpenAIApi(
    new Configuration({
        apiKey: runtimeConfig.openaiKey,
    })
)

const req = z.object({
    desc: z.string(),
})

export default defineEventHandler(async (event) => {
    try {
        const body = req.parse(await readBody(event))

        const res = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            stream: false,
            messages: [
                {
                    role: "system",
                    content:
                        "You are a job advisor to help people understand what they need to learn and do to succeed at a specific company for their job interview. The job could be in any field. You will be provided with a job description, which may include information on requirements for the job, things to know, and things that the person will be doing. Provide a to do list with each item separated by a newline. Each item should be information only a few words to a sentence long, and should be about one specific topic each to know for the interview. Include only the list bullet points without a title, and do not include any sub bullet points. On each line include only the list item text without labels.",
                },
                { role: "user", content: `Job description: ${body.desc}` },
            ],
            temperature: 0.2,
        })

        console.log("res: ", res)

        const data = (await res.json()) as ResponseTypes["createChatCompletion"]

        console.log("ACTUAL DATA: ", data)

        const ret: string[] = data.choices[0]?.message?.content?.split(
            "\n"
        ) as string[]

        return ret.filter((r: string): boolean => r.length > 2)
    } catch (error) {
        throw createError({
            statusCode: 400,
            statusMessage: "incorrect request data",
        })
    }
})
