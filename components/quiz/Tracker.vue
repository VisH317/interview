<script setup lang="ts">
import type { Note, Quiz } from "@prisma/client"
import VueApexCharts from "vue3-apexcharts"
import { chartConfig } from "../../utils/chartConfig.ts"

type Home = { type: "home" }
type InProgress = {
    type: "quiz"
    activeQuizId: string
}
type Graded = {
    type: "graded"
    activeQuizId: string
}

interface IGrade {
    grade: number
    num: number
    gradeList: number[]
    dateList: string[]
}

const user = useSupabaseUser()

const { data: upgraded } = await useFetch("/api/user", {
    query: { id: user.value?.id },
})

const calculateGrade = (): IGrade => {
    let grade = 0
    let num = 0
    const gradeList: number[] = []
    const dateList: string[] = []

    props.quizzes.forEach((q: Quiz) => {
        if (q.grade !== null) {
            grade += q.grade / q.questions.length
            num++
            gradeList.push(Math.round((q.grade / q.questions.length) * 100))
            dateList.push(
                new Date(q.date).getMonth() + "/" + new Date(q.date).getDate()
            )
        }
    })
    grade = Math.round((grade / num) * 100)

    return { grade, num, gradeList, dateList }
}

const chartOptions = ref({
    ...chartConfig,
    xaxis: {
        type: "datetime",
        categories: calculateGrade().dateList,
        tickAmount: 10,
        axisTicks: {
            show: true,
            color: "#64748b",
        },
        axisBorder: {
            show: true,
            color: "#64748b",
        },
        labels: {
            show: true,
            style: {
                colors: "#64748b",
                fontSize: "12px",
                fontFamily: "'Inter', sans-serif'",
                fontWeight: 400,
            },
        },
    },
})

const chartData = ref([
    {
        name: "Score",
        data: calculateGrade().gradeList,
    },
])

const props = defineProps<{
    quizzes: typeof Proxy<Array<Quiz>>
    note: Note
    refresh: () => Promise<void>
    state: "error" | "pending" | "received"
}>()

const currentNote = useState<string | null>("currentNote")

const quizModal = useState<boolean>("quiz")
const quizLoading = useState<boolean>("quizLoading")
const quizState = useState<Home | InProgress | Graded>("quizState")

const createQuiz = async () => {
    const { data: note } = await useFetch("/api/noteById", {
        query: { id: currentNote.value as string },
    })

    quizLoading.value = true
    const { data: quizData } = await useAsyncData("genQuiz", () =>
        $fetch("/api/quiz", {
            method: "POST",
            body: {
                text: note.value?.content,
                userid: user.value?.id,
            },
        })
    )

    const data: InProgress = {
        type: "quiz",
        activeQuizId: quizData.value![1],
    }

    quizState.value = data
    quizLoading.value = false
    await props.refresh()
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
                v-if="state === 'received'"
                class="text-7xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300 font-medium"
            >
                {{ calculateGrade().grade }}%
            </p>
            <SkeletonLoader
                v-else-if="state === 'pending'"
                bg-class="bg-slate-600"
                shimmer-color="#64748b"
                class=""
            >
                <p class="text-7xl text-transparent">{{ 100 }}%</p>
            </SkeletonLoader>
            <p v-if="state === 'received'" class="text-xl text-slate-300">
                Average Grade out of {{ calculateGrade().num }} quizzes
            </p>
            <SkeletonLoader
                v-else-if="state === 'pending'"
                bg-class="bg-slate-600"
                shimmer-color="#64748b"
                class=""
            >
                <p class="text-xl text-transparent">
                    Average Grade out of 7 quizzes
                </p>
            </SkeletonLoader>
            <div class="h-4" />
            <div class="w-[80%] h-[300px]">
                <SkeletonLoader
                    v-if="state === 'pending'"
                    bg-class="bg-slate-600"
                    shimmer-color="#64748b"
                    class="w-full h-full"
                />
                <ClientOnly v-else-if="state === 'received'">
                    <apexchart
                        type="line"
                        height="300"
                        :options="chartOptions"
                        :series="chartData"
                    />
                </ClientOnly>
            </div>
            <div class="h-4" />
            <button
                v-if="
                    state !== 'received' || (!upgraded && quizzes.length >= 5)
                "
                v-tippy="'Upgrade to get more quizzes'"
                :disabled="true"
                class="group bg-slate-600 w-40 justify-center items-center px-8 py-3 duration-300 text-slate-400 font-light text-xl cursor-no flex gap-4 rounded-[15px]"
            >
                Start Quiz
            </button>
            <button
                v-else
                class="group bg-gradient-to-r w-40 justify-center from-pink-300 to-blue-300 items-center px-8 py-3 hover:-translate-y-1 duration-300 text-white font-light text-xl cursor-pointer flex gap-4 rounded-[15px]"
                @click="() => void createQuiz()"
            >
                Start Quiz
            </button>
            <div class="h-2" />
            <div
                class="group bg-slate-500 w-40 justify-center items-center px-8 py-3 hover:-translate-y-1 duration-300 text-slate-300 font-light text-xl cursor-pointer flex gap-4 rounded-[15px]"
                @click="
                    () => {
                        quizModal = false
                    }
                "
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
                v-if="state === 'received'"
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
            <div
                v-else-if="state === 'pending'"
                :class="`grow gap-4 ${
                    quizzes.length === 0
                        ? 'flex justify-center items-center'
                        : 'flex flex-col w-[90%] items-center'
                }`"
            >
                <div class="h-6" />
                <SkeletonLoader class="w-full h-20 rounded-lg" />
                <SkeletonLoader class="w-full h-20 rounded-lg" />
                <SkeletonLoader class="w-full h-20 rounded-lg" />
            </div>
            <div v-else class="grow gap-4 flex justify-center items-center">
                <p class="text-xl font-light text-slate-300">
                    An error has occurred :(, please try again
                </p>
            </div>
        </div>
    </div>
</template>
