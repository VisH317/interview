<script setup lang="ts">
type InProgress = {
    type: "quiz"
    activeQuizId: string
}

const quizState = useState<InProgress>("quizState")

const { data: quiz } = await useFetch("/api/quizById", { query: { id: quizState.value.activeQuizId } })
console.log("QUIZZZZ: ", quiz.value)
</script>

<template>
    <div>
        {{ quiz.id }}
    </div>
</template>