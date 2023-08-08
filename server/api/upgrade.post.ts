import { z } from "zod"
import stripe from "../../utils/stripe"
import prisma from "../../utils/prisma"

const bodyType = z.object({
    id: z.string()
})

const { stripePrice } = useAppConfig()

interface UpgradeReturn {
    subscriptionId: string
    clientSecret: string
}

export default defineEventHandler(async (event): Promise<UpgradeReturn> => {
    const { id } = bodyType.parse(await readBody(event))

    const user = await prisma.user.findUnique({
        where: {
            id
        }
    })

    try {
        const subscription = await stripe.subscriptions.create({
            customer: user?.customer as string,
            items: [{
                price: stripePrice 
            }],
            payment_behavior: 'default_incomplete',
            payment_settings: { save_default_payment_method: 'on_subscription' },
            expand: ['latest_invoice.payment_intent'],
        })

        return {
            subscriptionId: subscription.id,
            clientSecret: (subscription.latest_invoice as any).payment_intent.client_secret
        }
    } catch (error) {
        setResponseStatus(event, 400)
        throw createError("Stripe subscription error: " + error)
    }
})