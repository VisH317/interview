<script setup lang="ts">
type InProgress = {
    type: "quiz"
    activeQuizId: string
}

type OEState = {
    type: "oe"
    content: string
}

type MCState = {
    type: "mc"
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
            return { type: "oe", content: "" }
        return { type: "mc", content: -1 }
    })
)
</script>

<template>
    <div class="w-full h-full flex p-5">
        <div class="w-[70%]">{{ quiz.id }}</div>
        <QuizNavigator :active="active" :formStates="formStates"/>
    </div>
</template>
