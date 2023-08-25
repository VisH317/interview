<script setup lang="ts">
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

// const activeQuizId = useState<string | null>("activeQuiz", () => null)
// const quizText = useState<string[]>("quizTextNew", () => [])
const quizLoading = useState<boolean>("quizLoading", () => false)

const visState = useState<Home | InProgress | Graded>("quizState", () => ({
    type: "home",
}))

const {
    data: quizzes,
    pending,
    error,
    refresh,
} = await useFetch("/api/quiz", {
    query: { id: user.value?.id },
})
</script>

<template>
    <NoteModal open-def="quiz">
        <Tracker
            v-if="visState.type === 'home'"
            :quizzes="quizzes"
            :refresh="refresh"
            :state="error ? 'error' : pending ? 'pending' : 'received'"
        />
        <QuizView v-if="visState.type === 'quiz'" />
        <Graded v-if="visState.type === 'graded'" />
    </NoteModal>
</template>
