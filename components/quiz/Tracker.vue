<script setup lang="ts">
import type { Note, Quiz } from '@prisma/client'

type Home = { type: "home" }
type InProgress = {
    type: "quiz"
    activeQuizId: string
}
type Graded = {
    type: "graded"
    activeQuizId: string
}

const user = useSupabaseUser()

const props = defineProps<{
    quizzes: typeof Proxy<Array<Quiz>>
    note: Note
}>()

const currentNote = useState<string | null>("currentNote")
console.log("oawiejfaowij: ", currentNote.value)

const { data: note } = await useFetch("/api/noteById", {
    query: { id: currentNote.value as string },
})
console.log("note::: ", note.value)

const quizModal = useState<boolean>("quiz")
const quizLoading = useState<boolean>("quizLoading")
const quizState = useState<Home | InProgress | Graded>("quizState")

const createQuiz = async () => {
    quizLoading.value = true
    console.log("nothing here to see :): ", props.note)
    const { data: quizData } = await useAsyncData("genQuiz", () =>
        $fetch("/api/quiz", {
            method: "POST",
            body: {
                text: note.value?.content,
                userid: user.value?.id,
            },
        })
    )

    console.log("data: ", quizData.value)

    const data: InProgress = {
        type: "quiz",
        activeQuizId: quizData.value[1],
    }

    quizState.value = data
    quizLoading.value = false
}

const inProgressQuiz = (quiz: Quiz) => {
    quizState.value = {
        type: quiz.graded ? "graded" : "quiz",
        activeQuizId: quiz.id,
    }
}
</script>

<template>
    <div class="flex w-full h-full">
        <div
            class="w-[30%] h-full bg-slate-700 flex flex-col justify-center items-center gap-2"
        >
            <p
                class="text-7xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300 font-medium"
            >
                95%
            </p>
            <p class="text-xl text-slate-300">
                Average Grade out of 14 quizzes
            </p>
            <div class="h-4" />
            <div
                class="group bg-gradient-to-r w-40 justify-center from-pink-300 to-blue-300 items-center px-8 py-3 hover:-translate-y-1 duration-300 text-white font-light text-xl cursor-pointer flex gap-4 rounded-[15px]"
                @click="() => void createQuiz()"
            >
                Start Quiz
            </div>
            <div class="h-2" />
            <div
                class="group bg-slate-600 w-40 justify-center items-center px-8 py-3 hover:-translate-y-1 duration-300 text-slate-400 font-light text-xl cursor-pointer flex gap-4 rounded-[15px]"
                @click="() => { quizModal=false }"
            >
                Back
            </div>
        </div>
        <div
            class="w-[70%] h-full text-slate-700 p-5 flex flex-col items-center py-10"
        >
            <div class="flex-none">
                <p class="text-6xl text-slate-800 font-bold">
                    Your
                    <span
                        class="bg-gradient-to-r from-pink-300 to-blue-300 text-transparent bg-clip-text"
                        >Quizzes</span
                    >
                </p>
            </div>
            <div class="flex-none h-4" />
            <div
                :class="`grow ${
                    quizzes.length === 0
                        ? 'flex justify-center items-center'
                        : 'flex flex-col w-[90%] items-center'
                }`"
            >
                <div v-if="quizzes.length === 0" class="text-slate-400">
                    No Quizzes, start a new one :)
                </div>
                <QuizHomeItem
                    v-for="quiz in quizzes"
                    :key="quiz.id"
                    :quiz="quiz"
                    @review="(quiz: Quiz) => inProgressQuiz(quiz)"
                />
            </div>
        </div>
    </div>
</template>
