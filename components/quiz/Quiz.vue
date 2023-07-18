<script setup lang="ts">
const user = useSupabaseUser()

const activeQuizId = useState<string | null>("activeQuiz", () => null)
const quizText = useState<string[]>("quizTextNew", () => [])
const quizLoading = useState<boolean>("quizLoading", () => false)

const { data: quizzes, pending, refresh } = await useFetch("/api/quiz", {
    query: { id: user.value?.id },
})
</script>

<template>
    <NoteModal open-def="quiz">
        <Tracker :quizzes="quizzes"/>
    </NoteModal>
</template>