<script setup lang="ts">
const user = useSupabaseUser()
const { data: flashcards, refresh } = await useFetch("/api/cards", { query: { id: user.value?.id } })

const quiz = useState<boolean>("quiz")
const currentNote = useState<string | null>("currentNote")
watch(currentNote, () => {
    if (currentNote === null) quiz.value = false
})

const { data: note, refresh: refreshNotes } = await useFetch("/api/noteById", { query: { id: currentNote } })


const createCard = () => {
    console.log("nothing here to see :)")
}
</script>

<template>
    <NoteModal open-def="flashcard">
        <div class="p-5 py-10 flex flex-col items-center gap-5 h-full">
            <div class="flex-none flex justify-between w-[90%] items-center">
                <h2 class="text-4xl text-slate-400 font-semibold">
                    {{ note.title }}: Your Flashcards
                </h2>
                <div
                    class="group relative flex flex-row items-center transition ease-in-out duration-300 hover:-translate-y-1 hover:opacity-[0.85] w-56 h-24">
                    <button
                        class="bg-gradient-to-br from-blue-300 to-pink-300 py-2 px-4 flex justify-center items-center blur-xl w-56 h-full absolute"></button>
                    <div class="group-hover:shadow-lg duration-300 transition ease-in-out bg-slate-800 text-white text-2xl font-light py-3 px-5 rounded-lg items-center h-14 w-52 cursor-pointer text-center z-20 absolute left-4 top-5"
                        @click="createCard">
                        Make Flashcards
                    </div>
                </div>
            </div>
            <div v-if="note.cards && note.cards.length===0" class="grow flex justify-center items-center text-4xl text-slate-400 font-semibold">No Flashcards Yet, Generate Some Above ⬆</div>
            <div v-else class="grow flex justify-center items-center gap-4">
                <span class="p-5">
                    <font-awesome-icon icon="fa-solid fa-caret-left" />
                </span>
                <span class="p-5">
                    <font-awesome-icon icon="fa-solid fa-caret-right" />
                </span>
            </div>
        </div>
    </NoteModal>
</template>