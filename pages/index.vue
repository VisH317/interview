<script setup lang="ts">
    useSeoMeta({ title: "Prepare for Interviews and Tests in Minutes - InterviewSense" })

    const login = useState<boolean>("login-modal", () => false)
    const signup = useState<boolean>("signup-modal", () => false)

</script>

<template>
    <div class="w-screen min-h-screen overflow-x-hidden">
        <Navbar />
        <Landing />
        <About />
        <Pricing />
        <Footer />
    </div>
    <Login/>
    <Signup/>
</template>
