<script setup>
    useHead({
        title: "Dashboard - InterviewSense"
    })

    const router = useRouter()
    const user = useSupabaseUser()
    const supabase = useSupabaseClient()

    const logout = () => {
        supabase.auth.signOut()
        router.push("/")
    }

    onMounted(() => { if(!user.value) router.push("/") })

    

</script>

<template>
    <div class="w-screen min-h-screen overflow-x-hidden flex flex-row">
        <div class="flex-none bg-slate-100 h-screen w-[300px] overflow-x-hidden overflow-y-auto flex flex-col">
            <div class="flex-none flex flex-row gap-3 items-center w-full cursor-pointer p-5 justify-center">
                <nuxt-img src="/logo.png" height="70px" width="70px"/>
                <!-- <p class="text-slate-800 font-semibold text-3xl">Interview<span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300">Sense</span></p> -->
            </div>
            <p class="flex-none text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300 font-medium text-xl text-center">{{ user.email.split("@")[0] }}'s Notes</p>
            <div class="h-4"/>
            <div class="w-full">
                <div class="w-full p-5 hover:bg-slate-300 duration-300 text-slate-400 font-normal text-xl cursor-pointer flex gap-4"><div class="inline"><font-awesome-icon icon="fa-solid fa-cog"/></div> Settings</div>
                <div class="w-full p-5 hover:bg-slate-300 duration-300 text-slate-400 font-normal text-xl cursor-pointer flex gap-4"><div class="inline"><font-awesome-icon icon="fa-solid fa-user"/></div> Account</div>
            </div>
            <div class="flex-none h-4"/>
            <div class="grow overflow-y-hidden flex flex-col">
                <div class="p-5 flex-none">
                    <p class="text-slate-600 font-semibold text-2xl">Your Note Pages</p>
                    <hr class="h-[2px] my-4 bg-gray-200 border-0 dark:bg-slate-400 rounded-lg">
                </div>
                <div class="overflow-y-auto grow">
                    <NavItem title="test" :id="1"/>
                    <NavItem title="test" :id="1"/>
                    <NavItem title="test" :id="1"/>
                    <NavItem title="test" :id="1"/>
                </div>
            </div>
            <div class="flex-none py-10">
                <hr class="h-[2px] w-[90%] mx-auto bg-gray-200 border-0 dark:bg-slate-400 rounded-lg"/>
                <div class="h-4"/>
                <div class="group w-full p-5 hover:bg-slate-300 duration-300 text-slate-400 font-normal text-xl cursor-pointer flex gap-4" @click="logout"><div class="inline"><font-awesome-icon icon="fa-solid fa-plus" class="group-hover:rotate-[360deg] duration-300"/></div> Create Note</div>
                <div class="group w-full p-5 hover:bg-slate-300 duration-300 text-slate-400 font-normal text-xl cursor-pointer flex gap-4" @click="logout"><div class="inline"><font-awesome-icon icon="fa-solid fa-sign-out" class="group-hover:translate-x-1 duration-300"/></div> Logout</div>
            </div>
            <div class="flex-none h-8"/>
        </div>
        <div class="bg-white h-screen grow overflow-x-hidden overflow-y-auto">
            <Main />
        </div>
    </div>
</template>