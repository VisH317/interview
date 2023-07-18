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

const props = defineProps<{
    quiz: Quiz
}>()

const hovering = ref<boolean>(false)

defineEmits<{
    (e: "review", quiz: Quiz): void
}>()

console.log("typeofasdfasdf: ", typeof props.quiz.date)
</script>

<template>
    <div class="flex p-5 rounded-[15px] hover:bg-slate-100 w-full items-center" @mouseover="hovering=true" @mouseout="hovering=false">
        <div class="flex-none">
            <p class="text-2xl font-medium text-slate-600">
                Quiz
                {{
                    new Date(quiz.date).getDay() +
                    "/" +
                    new Date(quiz.date).getMonth() +
                    "/" +
                    new Date(quiz.date).getFullYear()
                }}
            </p>
        </div>
        <div class="grow"></div>
        <div class="flex-none">
            <p class="text-2xl text-slate-500">Grade</p>
        </div>
        <div class="w-2" />
        <div
            :class="`group w-40 rounded-[10px] border-[1px] border-slate-100 ml-[5%] hover:-translate-y-1 ${hovering ? 'grad-hover' : 'grad'}`"
        >
            <div
                class="w-full justify-center items-center text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300 px-8 py-3 duration-300 font-medium text-xl cursor-pointer flex gap-4 rounded-[15px]"
                @click="() => $emit('review', quiz)"
            >
                {{ quiz.graded ? "Review" : "Continue" }}
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
    transition: 0.3s;
    display: hidden;
}

.grad-hover {
    border: double 2px transparent;
    border-radius: 10px;
    background-image: linear-gradient(#f1f5f9, #f1f5f9),
        linear-gradient(to right, #f9a8d4, #93c5fd);
    background-origin: border-box;
    background-clip: content-box, border-box;
    transition: 0.3s;
    display: hidden;
}
</style>
