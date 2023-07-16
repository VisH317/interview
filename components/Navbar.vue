<script setup lang="ts">

const login = useState<boolean>('login-modal')
const user = useSupabaseUser()
const router = useRouter()

const click = () => {
    if (user.value) router.push("/dashboard")
    else login.value = true
}

</script>

<template>
    <div
        class="w-full fixed backdrop-blur-lg border-black p-5 text-3xl font-semibold flex flex-row gap-10 justify-center items-center z-50">
        <div class="flex flex-row gap-10 items-center w-3/12 cursor-pointer">
            <nuxt-img src="/logo.png" height="50px" width="50px" />
            <p class="text-slate-800 font-semibold text-2xl">Interview<span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300">Sense</span></p>
        </div>
        <div class="flex flex-row gap-10 items-center w-1/6">
            <nuxt-link to="/about"
                class="text-slate-900 font-light text-xl duration-300 hover:text-slate-400">About</nuxt-link>
            <nuxt-link to="/about"
                class="text-slate-900 font-light text-xl duration-300 hover:text-slate-400">Pricing</nuxt-link>
            <Button :action="click" text="Sign In" />
    </div>
</div></template>