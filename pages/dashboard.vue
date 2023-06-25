<script setup>
    useHead({
        title: "Dashboard - InterviewSense"
    })

    const router = useRouter()
    const user = useSupabaseUser()

    if(!user.value) router.push("/")
</script>

<template>
    <div class="w-screen min-h-screen overflow-x-hidden flex flex-row">
        <div class="flex-none bg-slate-100 h-screen w-[300px] overflow-x-hidden overflow-y-auto flex flex-col">
            <div class="flex flex-row gap-3 items-center w-full cursor-pointer p-5 justify-center">
                <nuxt-img src="/logo.png" height="70px" width="70px"/>
                <!-- <p class="text-slate-800 font-semibold text-3xl">Interview<span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300">Sense</span></p> -->
            </div>
            <div class="h-4"/>
            <div class="w-full">
                <div class="w-full p-5 hover:bg-slate-300 duration-300 text-slate-600 font-normal text-xl cursor-pointer">⚙️ Settings </div>
                <div class="w-full p-5 hover:bg-slate-300 duration-300 text-slate-600 font-normal text-xl cursor-pointer">📒 Account</div>
            </div>
            <div class="h-4"/>
            <div class="p-5">
                <p class="text-slate-600 font-semibold text-2xl">Your Note Pages</p>
                <hr class="h-[2px] my-4 bg-gray-200 border-0 dark:bg-slate-400 rounded-lg">
            </div>
            </div>
        <div class="bg-white h-screen grow overflow-x-hidden overflow-y-auto">
            hola
        </div>
    </div>
</template>