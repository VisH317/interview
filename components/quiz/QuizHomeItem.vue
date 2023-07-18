<script setup lang="ts">
interface Quiz {
    id: string
    date: Date
    questions: string[]
    responses: string[]
    answers: string[]
    graded: boolean
    userid: string
}

defineProps<{
    quiz: Quiz
}>()

defineEmits<{
    (e: "review", quiz: Quiz): void
}>()
</script>

<template>
    <div class="flex p-5 rounded-[15px] hover:bg-slate-200">
        <div class="flex-none">
            <p>Quiz {{ quiz.date }}</p>
        </div>
        <div class="grow"></div>
        <div class="flex-none">
            <p class="text-2xl text-slate-500">Grade</p>
        </div>
        <div class="w-2" />
        <div
            class="bg-slate-200 w-40 rounded-[10px] border-[1px] border-slate-200 ml-[5%] h-64 grad"
        >
            <div
                class="w-full justify-center items-center text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300 px-8 py-3 hover:-translate-y-1 duration-300 text-white font-light text-xl cursor-pointer flex gap-4 rounded-[15px]"
                @click="() => $emit('review', quiz)"
            >
                {{ quiz.graded ? "Review Quiz" : "Continue Quiz" }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.grad {
    border: double 2px transparent;
    border-radius: 10px;
    background-image: linear-gradient(white, white),
        linear-gradient(to right, #f9a8d4, #93c5fd);
    background-origin: border-box;
    background-clip: content-box, border-box;
    transition: 0.15s;
    display: hidden;
}
</style>
