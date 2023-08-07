<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js'

const { clientSecret, subscriptionId } = defineProps<{
    clientSecret: string
    subscriptionId: string
}>()

const { stripePk } = useAppConfig()

const stripe = await loadStripe(stripePk)

const elements = ref<any>(null)

onMounted(() => {
    elements.value = stripe?.elements({
        clientSecret,
        appearance: {
            theme: "stripe"
        }
    })

    const payment = elements.value.create("payment")
    payment?.mount(this?.$refs.payment)
})

const submit = async () => {
    const { error } = await stripe?.confirmPayment({
        elements: elements.value,
        confirmParams: {
            return_url: "https://localhost:3000/dashboard?completed=true"
        }
    })

    if(error) {
        console.log("an error occurred")
    }
}

</script>

<template>
    <div class="fixed top-0 left-0 bg-[rgba(0,0,0,0.4)] w-screen h-screen flex justify-center items-center">
        <div class="w-1/2 h-1/2 rounded-xl bg-white">
            <div ref="payment"></div>
            <button @click="submit">Upgrade</button>
        </div>
    </div>
</template>