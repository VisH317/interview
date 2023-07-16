<script setup lang="ts">
const currentNote = useState<string | null>("currentNote")

const name = ref<string>("")
const desc = ref<string>("")
</script>

<template>
    <div
        class="w-full h-full flex flex-col items-center relative justify-center"
    >
        <div
            v-if="currentNote === null"
            class="flex flex-col w-[700px] max-w-[80%] gap-5 relative"
        >
            <h1 class="text-slate-800 text-[70px] font-bold relative left-6">
                Welcome! 🎉
            </h1>
            <p class="text-xl text-slate-600 font-light w-[90%]">
                Get ready to ace your interview in half the time using our
                tools. Use AI to prepare instantly
            </p>
            <div class="h-4" />
            <h2
                class="font-['Inter',sans-serif] text-sm text-slate-400 font-bold uppercase"
            >
                NOTE NAME
            </h2>
            <div
                class="bg-slate-200 w-[90%] rounded-[10px] border-[1px] ml-[5%] test"
            >
                <input
                    v-model="name"
                    type="text"
                    class="py-5 px-5 outline-none rounded-[9px] w-full h-full"
                />
            </div>
            <div class="h-4" />
            <h2
                class="font-['Inter',sans-serif] text-sm text-slate-400 font-bold uppercase"
            >
                Paste in your job description
            </h2>
            <div
                class="bg-slate-200 w-[90%] rounded-[10px] border-[1px] border-slate-200 ml-[5%] h-64 test"
            >
                <textarea
                    v-model="desc"
                    class="py-5 px-5 outline-none rounded-[9px] w-full h-full"
                    style="resize: none"
                />
            </div>
            <div class="h-2" />
            <div class="w-full flex justify-end">
                <button
                    class="group relative flex flex-row items-center transition ease-in-out duration-300 hover:-translate-y-1 hover:opacity-[0.85] w-44 h-20 relative -left-5 justify-center"
                >
                    <div
                        class="bg-gradient-to-br from-blue-300 to-pink-300 py-2 px-4 flex justify-center items-center blur-xl w-44 h-full absolute"
                    ></div>
                    <div
                        class="group-hover:shadow-lg duration-300 transition ease-in-out bg-slate-800 text-white text-xl font-light flex justify-center rounded-lg items-center w-36 h-12 cursor-pointer text-center z-20 absolute left-3 top-4"
                        @click="action"
                    >
                        Get Started
                    </div>
                </button>
            </div>
        </div>
    </div>
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
