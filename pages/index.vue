<script setup lang="ts">
useSeoMeta({
    title: "Prepare for Interviews and Tests in Minutes - InterviewSense",
})

const user = useSupabaseUser()
const router = useRouter()

watch(user, () => {
    if (user.value) {
        reloadNuxtApp({
            path: "/dashboard",
            ttl: 1000,
        })
        navigateTo("/dashboard")
    }
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const login = useState<boolean>("login-modal", () => false)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const signup = useState<boolean>("signup-modal", () => false)
</script>

<template>
    <div class="min-h-screen overflow-x-hidden">
        <Navbar />
        <Landing />
        <TestimonialList />
        <About />
        <Pricing />
        <Faq />
        <Cta />
        <Footer />
    </div>
    <Login />
    <Signup />
</template>
