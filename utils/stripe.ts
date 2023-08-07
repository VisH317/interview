import Stripe from "stripe"

const config = useAppConfig()

const stripe = new Stripe(config.stripeSk as string, {
    apiVersion: "2022-11-15"
})

export default stripe