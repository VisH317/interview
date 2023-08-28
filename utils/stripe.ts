import Stripe from "stripe"

const config = useAppConfig()

const stripe = new Stripe(process.env.STRIPE_SK as string, {
    apiVersion: "2022-11-15",
})

export default stripe
