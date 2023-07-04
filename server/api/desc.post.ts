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
                        "You are a job advisor to help people understand what they need to learn and do to succeed at a specific company for their job interview. The job could be in any field. You will be provided with a job description, which may include information on requirements for the job, things to know, and things that the person will be doing. Provide a 3-5 sentence summary based on the job description explaining the job position, the company and what it does, and what needs to be known and what needs to be learned to succeed at the job interview",
                },
                { role: "user", content: `Job description: ${body.desc}` },
            ],
            temperature: 0.2,
        })

        const data = (await res.json()) as ResponseTypes["createChatCompletion"]

        const ret: string = data.choices[0]?.message?.content as string

        return ret
    } catch (error) {
        throw createError({
            statusCode: 400,
            statusMessage: "incorrect request data",
        })
    }
})
