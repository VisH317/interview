<script setup lang="ts">
import { watch } from "fs"

type InProgress = {
    type: "quiz"
    activeQuizId: string
}

type OEState = {
    type: "oe"
    question: string
    content: string
}

type MCState = {
    type: "mc"
    question: string
    content: number
}

const currentNote = useState<string | null>("currentNote")
console.log("oawiejfaowij: ", currentNote.value)

const { data: note } = await useFetch("/api/noteById", {
    query: { id: currentNote.value as string },
})

// const disabled = ref<boolean>(true)

// watch(
//     formStates,
//     () => {
//         const ov: boolean = false
//         formStates.value.forEach((f) => {
//             if (
//                 (f.type === "oe" && f.content.length === 0) ||
//                 (f.type === "mc" && f.content === -1)
//             )
//                 ov = true
//         })
//         disabled.value = ov
//     },
//     { deep: true }
// )

const quizState = useState<InProgress>("quizState")

const { data: quiz } = await useFetch("/api/quizById", {
    query: { id: quizState.value.activeQuizId },
})

// navigation vars
const active = ref<number>(0)
const formStates = ref<(OEState | MCState)[]>(
    quiz.value?.questions.map((q: string): OEState | MCState => {
        if (q.split(";")[0].split(":")[1].toLowerCase().includes("open"))
            return { type: "oe", question: q, content: "" }
        return { type: "mc", question: q, content: -1 }
    })
)

const submitQuiz = async () => {
    await $fetch("/api/grade", {
        method: "POST",
        body: {
            id: quiz.value?.id,
            questions: formStates.value,
            text: note.value?.content
        }
    })
}
</script>

<template>
    <div class="w-full h-full flex p-5">
        <div class="w-[70%]">
            <!-- <OpenEnded
                v-if="formStates[active].type === 'oe'"
                :question="formStates[active]"
                :index="active"
                @change="updateValue"
            />
            <MultipleChoice
                v-if="formStates[active].type === 'mc'"
                :question="formStates[active]"
                :index="active"
                @change="updateValue"
            /> -->
            <div class="w-full h-full p-10 flex flex-col gap-5">
                <div class="flex-none">
                    <p class="text-5xl font-bold text-slate-800">
                        Question: {{ active }}
                    </p>
                </div>
                <div class="flex-none h-6" />
                <div class="flex-none">
                    <p class="font-medium text-slate-400 text-xl">
                        {{
                            formStates[active].question
                                .split(";")[1]
                                .split(":")[1]
                        }}
                    </p>
                </div>
                <div class="flex-none h-4" />
                <div
                    class="flex-none h-px w-[100%] bg-gradient-to-r from-pink-300 to-blue-300"
                ></div>
                <div class="flex-none h-2" />
                <div
                    v-if="formStates[active].type === 'oe'"
                    class="grow w-full flex justify-center"
                >
                    <textarea
                        class="w-[90%] h-full outline-none outline-transparent border-0 appearance-none"
                        style="resize: none"
                        placeholder="Your Answer Here..."
                        v-model="formStates[active].content"
                    />
                </div>
                <div
                    v-if="formStates[active].type === 'mc'"
                    class="grow w-full flex justify-center"
                >
                    <div
                        class="w-[90%] h-full flex flex-col justify-center gap-5"
                    >
                        <div
                            v-for="(ans, ix) in formStates[active].question
                                .split(';')[2]
                                .split(':')[1]
                                .split(', ')"
                            :key="ans"
                            class="flex items-center mb-4"
                        >
                            <input
                                v-model="formStates[active].content"
                                :id="ans"
                                type="radio"
                                :value="ix"
                                class="w-5 h-5 appearance-none rounded-[50%] text-blue-600 bg-gradient-to-br from-slate-100 to-slate-100 border-white border-2 checked:from-pink-300 checked:to-blue-300 focus:ring-slate-200 focus:ring-2"
                            />
                            <label
                                :for="ans"
                                class="ml-5 text-2xl font-medium text-slate-500"
                                >{{ ans }}</label
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <QuizNavigator
            :active="active"
            :form-states="formStates"
            @active-change="
                (ix) =>
                    (active =
                        ix < 0
                            ? formStates.length - 1
                            : ix >= formStates.length
                            ? 0
                            : ix)
            "
        />
    </div>
</template>
