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
const { data: quizzes, pending, refresh } = await useFetch("/api/quiz", {
    query: { id: user.value?.id },
})

const quiz = useState<boolean>("quiz")
const currentNote = useState<string | null>("currentNote")

console.log("pending: ", pending)
console.log("currentNote: ", currentNote.value)

// const { data: note, refresh: refreshNotes, error } = await useFetch("/api/noteById", {
//     query: { id: currentNote.value },
// })

const { data: note, refresh: refreshNotes, error } = await useAsyncData(`get_note${currentNote}`, () => $fetch("/api/noteById", {
    query: { id: currentNote.value as string }
    }),
    {
        watch: [currentNote],
    }
)

console.log("error: ", error.value)

watch(currentNote, () => {
    if (currentNote.value === null) quiz.value = false
})

watch(note, () => {
    console.log("noteChanges? ", note.value)
})

console.log("NOTE: ", note)

const currentQuiz = ref<"home" | "quiz" | "graded">("home")
const loading = ref<boolean>(false)

const quizText = ref<string[]>([])
const formStates = ref<(string | number)[]>([])
const quizQuestions = ref<(OpenEnded | MultipleChoice)[]>([])
const currentFormId = ref<string>()

const createQuiz = async () => {
    loading.value = true
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
    currentFormId.value = quizData.value[1]

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

    currentQuiz.value = "quiz"
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
    const newAnswers = []

    //eslint-disable-next-line array-callback-return
    quizQuestions.value.map((q) => {
        if ("answer" in q && q.answer === null) {
            q.answer = answers.value[it]
            it++
        }
    })

    quizQuestions.value.map((q) => {
        if ("answer" in q) newAnswers.push(q.answer)
        else newAnswers.push(String(q.correct))
    })

    await $fetch("/api/quiz", {
        method: "PATCH",
        body: {
            id: currentFormId.value,
            answers: newAnswers
        }
    })

    quizQuestions.value = newQuestions
    currentQuiz.value = "graded"
}

const addOldQuiz = async (id: number) => {
    const quiz = quizzes.value![id]
    console.log("id: ", id)
    console.log("quiz: ", quiz.id)

    quizText.value = quiz.questions
    currentFormId.value = quiz.id

    // eslint-disable-next-line array-callback-return
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

    currentQuiz.value = "quiz"
    loading.value = false
}

</script>

<template>
    <NoteModal open-def="quiz">
        <div :class="`w-full h-full absolute bg-[rgba(30,41,59,0.7)] z-50 flex justify-center items-center text-4xl font-semibold ${loading ? '' : 'hidden'
            }`">
            LOADING
        </div>
        <div v-if="currentQuiz === 'quiz'" class=" flex flex-col items-center h-full w-full">
            <div class="flex-none py-5">
                <h2 class="text-4xl text-slate-400 font-semibold">
                    {{ note?.title }}: Quiz
                </h2>
            </div>
            <div class="grow flex flex-col gap-5 overflow-y-auto w-full items-center">
                <div v-for="(question, ix) in quizQuestions" class="p-5 w-[80%]">
                    <div v-if="'answers' in question" class="flex flex-col gap-2">
                        <p class="text-xl text-slate-500">
                            {{ question.question }}
                        </p>
                        <div v-for="(answer, idx) in question.answers">
                            <input v-model="formStates[ix]" type="radio" :value="idx" />
                            {{ answer }}
                        </div>
                        <hr class="w-48 h-1 mx-auto bg-slate-400 border-0 rounded md:my-10 dark:bg-slate-400">
                    </div>
                    <div v-else class="flex flex-col gap-2">
                        <p class="text-xl text-slate-400 font-light">
                            {{ String(ix+1) + ": " + question.question.split(":")[1].replace(/^\s+|\s+$/g, "") }}
                        </p>
                        <div
                            class="transition-all duration-300 p-[2px] rounded-lg bg-gradient-to-br from-blue-300 to-pink-300 w-full h-32">
                            <textarea type="text" class="w-full p-5 h-full rounded-md outline-none text-lg"
                                v-model="formStates[ix]" placeholder="Answer: " style="resize: none" />
                        </div>
                        <hr class="w-48 h-1 mx-auto mt-4 bg-gray-100 border-0 rounded dark:bg-slate-300">
                    </div>
                </div>
            </div>
            <div class="w-full justify-end flex pr-20 bg-slate-100 p-2 py-4">
                <div
                    class="group relative flex flex-row items-center transition ease-in-out duration-300 hover:-translate-y-1 hover:opacity-[0.85] w-48 h-24">
                    <button
                        class="bg-gradient-to-br from-blue-300 to-pink-300 py-2 px-4 flex justify-center items-center blur-xl w-48 h-full absolute"></button>
                    <div
                        class="group-hover:shadow-lg duration-300 transition ease-in-out bg-slate-800 text-white text-2xl font-light py-3 px-5 rounded-lg items-center h-14 w-44 cursor-pointer text-center z-20 absolute left-4 top-5"
                        @click="submitQuiz"
                    >
                        Submit Quiz
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="currentQuiz === 'graded'" class="p-5 py-10 flex flex-col items-center gap-5">
            <div class="flex-none">
                <h2 class="text-4xl text-slate-400 font-semibold">
                    {{ note?.title }}: Quiz Results
                </h2>
            </div>
            <div class="grow flex flex-col gap-5 items-center">
                <div v-for="(question, ix) in quizQuestions">
                    <div v-if="'answers' in question" class="flex flex-col gap-2">
                        <p class="text-xl text-slate-800">
                            {{ question.question }}
                        </p>
                        <div v-for="(answer, idx) in question.answers"
                            :class="`${formStates[ix] !== question.correct && idx === question.correct ? 'bg-red-300' : formStates[ix] === question.correct && idx === question.correct ? 'bg-green-300' : ''}`">
                            <input type="radio" />
                            {{ answer }}
                        </div>
                    </div>
                    <div v-else class="flex flex-col gap-2">
                        <p class="text-xl text-slate-800">
                            {{ question.question }}
                        </p>
                        <p class="text-xl text-slate-800">
                            Graded: {{ question.answer }}
                        </p>
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
            <div class="h-4"/>
            <div class="flex flex-col w-[90%] gap-2">
                <div v-for="(quiz, id) in quizzes" :class="`p-5 ${quiz.answers.length!==0 ? 'hover:bg-green-300' : 'hover:bg-slate-200'} duration-300`" @click="() => addOldQuiz(id)">
                    <h1 class="text-2xl font-semibold text-slate-800">Quiz {{ quiz.date }}</h1>
                </div>
            </div>
        </div>
    </NoteModal>
</template>
