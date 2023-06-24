<script setup lang="ts">

    const login = useState<boolean>("login-modal")
    const signup = useState<boolean>("signup-modal")

    // form states
    const email = ref<string>("")
    const password = ref<string>("")
    const retype = ref<string>("")

    // form barrier states
    const disabled = ref<boolean>(true)
    const matching = ref<boolean>(true)

    watch([email, password, retype], ([e, p, r]) => {
        if(p.length===0 || r.length===0) matching.value = true
        if(e.length===0 || p.length===0 || r.length===0) disabled.value = true
        else {
            if(p!==r) matching.value = false
            else {
                matching.value = true
                disabled.value = false
            }
        }
    })

    const onSubmit = async () => {
        
    }

</script>

<template>
    <Modal openDef="signup-modal">
        <div class="w-full h-full flex justify-center">
            <div class="w-[40%] h-full bg-slate-700 p-5 flex flex-col justify-center items-center gap-4">
                <div class="flex justify-center items-center gap-4">
                    <nuxt-img src="/logo.png" height="70px" width="70px"/>
                    <p class="text-slate-100 font-semibold text-4xl">Interview<span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300">Sense</span></p>
                </div>
                <!-- <div class="relative inline-flex items-center justify-center w-full">
                    <hr class="w-64 h-px my-8 bg-gray-200 border-[1px] border-slate-300 dark:bg-slate-600">
                     <span class="absolute px-3 font-normal text-slate-600 bg-slate-700 mx-auto dark:text-slate-400 "></span>
                </div> -->
            </div>
            <div class="w-[60%] flex flex-col items-center justify-center gap-4">
                <h3 class="text-6xl font-bold text-slate-800">Welcome!</h3>
                <div class="h-12"/>
                <div class="transition-all duration-300 p-[2px] rounded-lg bg-gradient-to-br from-blue-300 to-pink-300 w-[70%]">
                    <input type="text" class="w-full p-5 rounded-md outline-none text-lg" placeholder="Email: " v-model="email"/>
                </div>
                <div class="h-6"/>
                <div class="transition-all duration-300 p-[2px] rounded-lg bg-gradient-to-br from-blue-300 to-pink-300 w-[70%]">
                    <input type="password" class="w-full p-5 rounded-md outline-none text-lg" placeholder="Password: " v-model="password"/>
                </div>
                <div class="h-6"/>
                <div class="transition-all duration-300 p-[2px] rounded-lg bg-gradient-to-br from-blue-300 to-pink-300 w-[70%]">
                    <input type="password" class="w-full p-5 rounded-md outline-none text-lg" placeholder="Retype Password: " v-model="retype"/>
                </div>
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert" v-if="!matching">
                    <strong class="font-bold">Hold up!  </strong>
                    <span class="block sm:inline">Those passwords dont match</span>
                </div>
                <div class="relative inline-flex items-center justify-center w-full">
                    <hr class="w-64 h-px my-8 bg-gray-200 border-[1px] border-slate-300 dark:bg-slate-600">
                    <span class="absolute px-3 font-normal text-slate-600 bg-white mx-auto dark:text-slate-400 " @click="() => { login = true; signup = false }">Sign In Here :)</span>
                </div>
                <div :class="`group relative flex flex-row items-center transition ease-in-out duration-300 ${disabled ? '' : 'hover:-translate-y-1 hover:opacity-[0.85]'} w-48 h-24`">
                    <button :disabled="disabled" class="bg-gradient-to-br from-blue-300 to-pink-300 py-2 px-4 flex justify-center items-center blur-xl w-48 h-full absolute" v-if="!disabled" @click="() => void onSubmit()"></button>
                    <div :class="` ${disabled ? 'bg-slate-300 cursor-default' : 'group-hover:shadow-lg bg-slate-800 cursor-pointer'} text-white duration-300 transition ease-in-out text-2xl font-light rounded-lg h-14 w-40 text-center flex justify-center items-center z-20 absolute left-4 top-5`">Sign Up</div>
                </div>
                
            </div>
        </div>
    </Modal>
</template>