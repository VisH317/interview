<script setup lang="ts">
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
</script>

<template>
    <div class="w-full h-full flex p-5">
        <div class="w-[70%]">
            <OpenEnded
                v-if="formStates[active].type === 'oe'"
                :question="formStates[active]"
                :index="active"
            />
            <MultipleChoice
                v-if="formStates[active].type === 'mc'"
                :question="formStates[active]"
                :index="active"
            />
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
