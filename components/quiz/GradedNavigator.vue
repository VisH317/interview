<script setup lang="ts">
import type { Quiz } from "@prisma/client"

defineProps<{
    active: number
    quiz: Quiz
}>()
defineEmits<{
    (e: "activeChange", num: number): void
    (e: "back"): void
}>()
</script>

<template>
    <div
        class="w-[30%] rounded-[15px] bg-slate-600 h-full p-5 flex flex-col justify-center items-center pt-[5%] pb-[5%]"
    >
        <div class="flex-none">
            <p
                class="text-5xl font-medium text-transparent bg-clip-text bg-gradient-to-r h-16 from-pink-300 to-blue-300"
            >
                Progress
            </p>
        </div>
        <div class="flex-none h-10" />
        <div class="grow flex flex-wrap gap-4 w-[80%] justify-start">
            <div
                v-for="ix in Array(quiz.questions.length).keys()"
                :key="ix"
                :class="`border-none rounded-[50%] flex justify-center items-center aspect-square cursor-pointer ${
                    ix === active
                        ? 'text-white bg-gradient-to-r bg-no-repeat from-pink-300 to-blue-300 border-none'
                        : (quiz.answers[ix].length === 1 &&
                              quiz.answers[ix] === quiz.responses[ix]) ||
                          (quiz.answers[ix].length >= 1 &&
                              !quiz.answers[ix].split(':')[0].includes('in'))
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 opacity-80 text-white'
                } w-10 h-10`"
                @click="() => $emit('activeChange', ix)"
            >
                {{ ix + 1 }}
            </div>
        </div>
        <div class="flex-none flex w-[80%] flex-col gap-3">
            <div class="flex gap-3 justify-between">
                <button
                    class="group bg-slate-500 w-1/2 justify-center items-center px-8 py-2 h-14 hover:-translate-y-1 duration-300 text-slate-400 font-light text-xl cursor-pointer flex gap-4 rounded-[15px]"
                    @click="() => $emit('activeChange', active - 1)"
                >
                    <font-awesome-icon
                        icon="fa-solid fa-caret-left"
                        class="text-white text-4xl"
                    />
                </button>
                <button
                    class="group bg-slate-500 w-1/2 justify-center items-center px-8 py-2 h-14 hover:-translate-y-1 duration-300 text-slate-400 font-light text-xl cursor-pointer flex gap-4 rounded-[15px]"
                    @click="() => $emit('activeChange', active + 1)"
                >
                    <font-awesome-icon
                        icon="fa-solid fa-caret-right"
                        class="text-white text-4xl"
                    />
                </button>
            </div>
            <button
                class="group bg-gradient-to-r w-full disabled:bg-slate-500 justify-center from-pink-300 h-14 to-blue-300 items-center px-8 py-3 enabled:hover:-translate-y-1 duration-300 text-white font-light text-2xl cursor-pointer flex gap-4 rounded-[15px]"
                @click="() => $emit('back')"
            >
                Back
            </button>
        </div>
    </div>
</template>
