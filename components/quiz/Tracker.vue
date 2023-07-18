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
    quizzes: typeof Proxy<Array<Quiz>>
}>()

const quizModal = useState<boolean>("quiz")
const activeQuizId = useState<string | null>("activeQuiz")
const quizText = useState<string[]>("quizTextNew")
const quizLoading = useState<boolean>("quizLoading")

const createQuiz = async () => {
    quizLoading.value = true
    console.log("nothing here to see :)")
    const { data: quizData } = await useAsyncData("genQuiz", () =>
        $fetch("/api/quiz", {
            method: "POST",
            body: {
                text: note.value?.content,
                userid: user.value?.id,
            },
        })
    )

    console.log("data: ", quizData)

    quizText.value = quizData.value[0]
    activeQuizId.value = quizData.value[1]

    // quizText.value.map((t) => {
    //     const value: string[] = t.split(";")
    //     if (value[0]?.includes("open") || value[0]?.includes("ended")) {
    //         const ret: OpenEnded = {
    //             question: value[1]?.replace(/^\s+|\s+$/g, ""),
    //             answer: null,
    //         }
    //         quizQuestions.value = [...quizQuestions.value, ret]
    //         formStates.value = [...formStates.value, ""]
    //         return
    //     }

    //     const answers = value[2]?.split(",")
    //     answers.map((a, ix) => (answers[ix] = a.replace(/^\s+|\s+$/g, "")))

    //     const ret: MultipleChoice = {
    //         question: value[1]?.replace(/^\s+|\s+$/g, ""),
    //         answers,
    //         correct: Number(value[3]?.replace(/^\s+|\s+$/g, "")),
    //     }

    //     // formStates.value = [...formStates.value, -1]
    //     formStates.value = [...formStates.value, -1]
    //     quizQuestions.value = [...quizQuestions.value, ret]
    // })

    // currentQuiz.value = "quiz"
    quizLoading.value = false
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
            <div
                :class="`grow ${
                    quizzes.length === 0
                        ? 'flex justify-center items-center'
                        : ''
                }`"
            >
                <div v-if="quizzes.length === 0" class="text-slate-400">
                    No Quizzes, start a new one :)
                </div>
                <QuizHomeItem
                    v-for="quiz in quizzes"
                    :key="quiz.id"
                    :quiz="quiz"
                />
            </div>
        </div>
    </div>
</template>
