import { z } from "zod"
import prisma from "../../utils/prisma"
import stripe from "../../utils/stripe"

const bodyType = z.object({
    id: z.string(),
    email: z.string()
})

export default defineEventHandler(async (event) => {
    const { id, email } = bodyType.parse(await readBody(event))

    // create stripe customer
    const customer = await stripe.customers.create({
        email
    })

    try {
        await prisma.user.create({
            data: {
                id,
                upgraded: false,
                customer: customer.id,
            },
        })
    } catch (error) {
        setResponseStatus(event, 201)
        return "user already created"
    }

    setResponseStatus(event, 201)
    return "user created successfully"
})