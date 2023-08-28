<script setup lang="ts">
const router = useRouter()

const supabase = useSupabaseClient()

const login = useState<boolean>("login-modal")
const signup = useState<boolean>("signup-modal")

// form states (ig use ref for local)
const email = ref<string>("")
const password = ref<string>("")

const message = ref<string>("")

const disabled = ref<boolean>(true)

watch([email, password], ([e, p]) => {
    if (e.length === 0 || p.length === 0) disabled.value = true
    else disabled.value = false
})

const onSubmit = () => {
    console.log("SUBMITTING")
    // const user = await supabase.auth.signInWithPassword({
    //     email: email.value,
    //     password: password.value,
    // })
    // console.log("HEELO")
    // if (user.error) alert("Email and password do not match")
    // await router.push("/dashboard")
    supabase.auth
        .signInWithPassword({
            email: email.value,
            password: password.value,
        })
        .then(async (u) => {
            if (u.error) {
                message.value = u.error.message
                return
            }
            await navigateTo("/dashboard")
            reloadNuxtApp({
                path: "/dashboard",
                ttl: 1000,
            })
        })
}

// onMounted(() => {
//     if(user.value) router.push("/dashboard")
// })
</script>

<template>
    <Modal open-def="login-modal">
        <div class="w-full h-full flex justify-center">
            <div
                class="w-[40%] h-full bg-slate-700 p-5 flex flex-col justify-center items-center gap-4"
            >
                <div class="flex justify-center items-center gap-4">
                    <nuxt-img src="/logo.png" height="70px" width="70px" />
                    <p class="text-slate-100 font-semibold text-3xl">
                        Interview<span
                            class="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300"
                            >Sense</span
                        >
                    </p>
                </div>
                <!-- <div class="relative inline-flex items-center justify-center w-full">
                    <hr class="w-64 h-px my-8 bg-gray-200 border-[1px] border-slate-300 dark:bg-slate-600">
                     <span class="absolute px-3 font-normal text-slate-600 bg-slate-700 mx-auto dark:text-slate-400 "></span>
                </div> -->
            </div>
            <div
                class="w-[60%] flex flex-col items-center justify-center gap-4"
            >
                <h3 class="text-6xl font-bold text-slate-800">Welcome Back</h3>
                <div class="h-12" />
                <div
                    class="transition-all duration-300 bg-slate-200 w-[70%] rounded-[10px] border-[1px] border-slate-200 test w-[70%]"
                >
                    <input
                        v-model="email"
                        type="email"
                        class="w-full p-5 rounded-[11px] outline-none text-lg"
                        placeholder="Email: "
                    />
                </div>
                <div class="h-6" />
                <div
                    class="transition-all duration-300 bg-slate-200 w-[70%] rounded-[10px] border-[1px] border-slate-200 test w-[70%]"
                >
                    <input
                        v-model="password"
                        type="password"
                        class="w-full p-5 rounded-[11px] outline-none text-lg"
                        placeholder="Password: "
                    />
                </div>
                <div
                    v-if="message.length > 0"
                    class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert"
                >
                    <strong class="font-bold">Hold up! </strong>
                    <span class="block sm:inline"
                        >{{ message }}</span
                    >
                </div>
                <div
                    class="relative inline-flex items-center justify-center w-full"
                >
                    <hr
                        class="w-80 h-px my-8 bg-gray-200 border-[1px] border-slate-300 dark:bg-slate-600"
                    />
                    <span
                        class="absolute px-3 font-normal text-slate-600 bg-white mx-auto dark:text-slate-400 cursor-pointer"
                        @click="
                            () => {
                                login = false
                                signup = true
                            }
                        "
                        >Sign Up Here</span
                    >
                </div>
                <div
                    :class="`group relative flex flex-row items-center transition ease-in-out duration-300 ${
                        disabled
                            ? ''
                            : 'hover:-translate-y-1 hover:opacity-[0.85]'
                    } w-48 h-24`"
                    @click="onSubmit"
                >
                    <button
                        v-if="!disabled"
                        :disabled="disabled"
                        class="bg-gradient-to-br from-blue-300 to-pink-300 py-2 px-4 flex justify-center items-center blur-xl w-48 h-full absolute"
                    ></button>
                    <div
                        :class="` ${
                            disabled
                                ? 'bg-slate-300 cursor-default'
                                : 'group-hover:shadow-lg bg-slate-800 cursor-pointer'
                        } text-white duration-300 transition ease-in-out text-2xl font-light rounded-lg h-14 w-40 text-center flex justify-center items-center z-20 absolute left-4 top-5`"
                    >
                        Sign In
                    </div>
                </div>
            </div>
        </div>
    </Modal>
</template>

<style scoped>
.test {
    border: double 2px transparent;
    border-radius: 10px;
    background-image: linear-gradient(white, white),
        linear-gradient(to right, #e2e8f0, #e2e8f0);
    background-origin: border-box;
    background-clip: content-box, border-box;
    transition: 0.15s;
    display: hidden;
}

.test:hover {
    border: double 2px transparent;
    background-image: linear-gradient(white, white),
        linear-gradient(to right, #f9a8d4, #93c5fd);
}

.test:focus {
    border: double 2px transparent;
    background-image: linear-gradient(white, white),
        linear-gradient(to right, #f9a8d4, #93c5fd);
}
</style>
