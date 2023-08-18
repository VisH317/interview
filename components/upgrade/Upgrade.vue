<!-- <script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js'

// global state
const clientSecret = useState<string | null>("client-secret", () => null)

const { stripePk } = useAppConfig()

const upgradeModal = useState<boolean>("upgrade-modal", () => false)

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

watch(upgradeModal, () => {
    if(upgradeModal.value === false) clientSecret.value = null
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
    <div :class="`fixed top-0 left-0 bg-[rgba(0,0,0,0.4)] w-screen h-screen flex justify-center items-center ${!upgradeModal ?? 'hidden'}`">
        <div class="w-1/2 h-1/2 rounded-xl bg-white">
            <div ref="payment"></div>
            <button @click="() => void submit()">Upgrade</button>
        </div>
    </div>
</template> -->