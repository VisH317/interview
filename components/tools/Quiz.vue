<script setup lang="ts">
interface OpenEnded {
    question: string
    answer: string | null
}

interface MultipleChoice {
    question: string
    answers: string[]
    correct: number
}

const user = useSupabaseUser()
const { data: quizzes, refresh } = await useFetch("/api/quiz", {
    query: { id: user.value?.id },
})

const quiz = useState<boolean>("quiz")
const currentNote = useState<string | null>("currentNote")
watch(currentNote, () => {
    if (currentNote.value === null) quiz.value = false
})

const currentQuiz = ref<boolean>(false)
const loading = ref<boolean>(false)

const { data: note, refresh: refreshNotes } = await useFetch("/api/noteById", {
    query: { id: currentNote.value },
})

const quizText = ref<string[]>([])
const formStates = ref<(string | number)[]>([])
const quizQuestions = ref<(OpenEnded | MultipleChoice)[]>([])

const createQuiz = async () => {
    loading.value = true
    console.log("nothing here to see :)")
    const { data: quizData } = await useAsyncData("genQuiz", () =>
        $fetch("/api/quiz", {
            method: "POST",
            body: {
                text: note.value?.content,
            },
        })
    )

    console.log("data: ", quizData)

    quizText.value = quizData.value

    quizText.value.map((t) => {
        const value: string[] = t.split(";")
        if (value[0]?.includes("open") || value[0]?.includes("ended")) {
            const ret: OpenEnded = {
                question: value[1]?.replace(/^\s+|\s+$/g, ""),
                answer: null,
            }
            quizQuestions.value = [...quizQuestions.value, ret]
            formStates.value = [...formStates.value, ""]
            return
        }

        const answers = value[2]?.split(",")
        answers.map((a, ix) => (answers[ix] = a.replace(/^\s+|\s+$/g, "")))

        const ret: MultipleChoice = {
            question: value[1]?.replace(/^\s+|\s+$/g, ""),
            answers,
            correct: Number(value[3]?.replace(/^\s+|\s+$/g, "")),
        }

        formStates.value = [...formStates.value, -1]
        quizQuestions.value = [...quizQuestions.value, ret]
    })

    currentQuiz.value = true
    loading.value = false
}

const submitQuiz = async () => {
    const arr = quizQuestions.value.filter((q) => !("answers" in q))
    const req: string[] = []
    // eslint-disable-next-line array-callback-return
    arr.map((q, ix) => {
        req.push(
            ("Question: " +
                q.question +
                " Answer: " +
                formStates.value[ix]) as string
        )
    })

    const { data: answers } = await useAsyncData(
        `grade_quiz_${note.value.id}`,
        () =>
            $fetch("/api/grade", {
                method: "POST",
                body: {
                    text: note.value?.content,
                    questions: req,
                },
            })
    )

    let it = 0;

    const newQuestions = [...quizQuestions.value]

    //eslint-disable-next-line array-callback-return
    quizQuestions.value.map((q) => {
        if ("answer" in q && q.answer === null) {
            q.answer = answers.value[it]
            it++
        }
    })

    quizQuestions.value = newQuestions
}
</script>

<template>
    <NoteModal open-def="quiz">
        <div :class="`w-full h-full absolute bg-[rgba(30,41,59,0.7)] z-50 flex justify-center items-center text-4xl font-semibold ${loading ? '' : 'hidden'
            }`">
            LOADING
        </div>
        <div v-if="currentQuiz" class="p-5 py-10 flex flex-col items-center gap-5">
            <div class="flex-none">
                <h2 class="text-4xl text-slate-400 font-semibold">
                    {{ note?.title }}: Quiz
                </h2>
            </div>
            <div class="grow flex flex-col gap-5 items-center">
                <div v-for="(question, ix) in quizQuestions">
                    <div v-if="'answers' in question" class="flex flex-col gap-2">
                        <p class="text-xl text-slate-800">
                            {{ question.question }}
                        </p>
                        <div v-for="(answer, idx) in question.answers">
                            <input v-model="formStates[ix]" type="radio" :value="idx" />
                            {{ answer }}
                        </div>
                    </div>
                    <div v-else class="flex flex-col gap-2">
                        <p class="text-xl text-slate-800">
                            {{ question.question }}
                        </p>
                        <div
                            class="transition-all duration-300 p-[2px] rounded-lg bg-gradient-to-br from-blue-300 to-pink-300 w-[70%]">
                            <textarea type="text" class="w-full p-5 rounded-md outline-none text-lg"
                                v-model="formStates[ix]" placeholder="Email: " style="resize: none" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="p-5 py-10 flex flex-col items-center gap-5">
            <div class="flex justify-between w-[90%] items-center">
                <h2 class="text-4xl text-slate-400 font-semibold">
                    {{ note?.title }}: Your Quizzes
                </h2>
                <div
                    class="group relative flex flex-row items-center transition ease-in-out duration-300 hover:-translate-y-1 hover:opacity-[0.85] w-48 h-24">
                    <button
                        class="bg-gradient-to-br from-blue-300 to-pink-300 py-2 px-4 flex justify-center items-center blur-xl w-48 h-full absolute"></button>
                    <div class="group-hover:shadow-lg duration-300 transition ease-in-out bg-slate-800 text-white text-2xl font-light py-3 px-5 rounded-lg items-center h-14 w-40 cursor-pointer text-center z-20 absolute left-4 top-5"
                        @click="createQuiz">
                        Start a Quiz
                    </div>
                </div>
            </div>
            <div class="flex flex-col w-[90%] gap-2">
                <div v-for="quiz in quizzes" class="p-5">
                    <h1>{{ quiz.title }}</h1>
                </div>
            </div>
        </div>
    </NoteModal>
</template>
