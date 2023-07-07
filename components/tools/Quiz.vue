<script setup lang="ts">
const user = useSupabaseUser()
const { data: quizzes, refresh } = await useFetch("/api/quiz", { query: { id: user.value?.id } })

const quiz = useState<boolean>("quiz")
const currentNote = useState<string | null>("currentNote")
watch(currentNote, () => {
    if (currentNote === null) quiz.value = false
})

const currentQuiz = ref<boolean>(false)
const loading = ref<boolean>(false)

const { data: note, refresh: refreshNotes } = await useFetch("/api/noteById", { query: { id: currentNote } })


const createQuiz = () => {
    console.log("nothing here to see :)")
}
</script>

<template>
    <NoteModal open-def="quiz">
        <div :class="`w-full h-full absolute bg-[rgba(30,41,59,0.7)] z-50 flex justify-center items-center text-4xl font-semibold ${loading ? '' : 'hidden'}`">LOADING</div>
        <div v-if="currentQuiz" class="p-5 py-10 flex flex-col items-center gap-5">
            test
        </div>
        <div v-else class="p-5 py-10 flex flex-col items-center gap-5">
            <div class="flex justify-between w-[90%] items-center">
                <h2 class="text-4xl text-slate-400 font-semibold">
                    {{ note.title }}: Your Quizzes
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
                <div class="p-5" v-for="quiz in quizzes">
                    <h1>{{ quiz.title }}</h1>
                </div>
            </div>
        </div>
    </NoteModal>
</template>