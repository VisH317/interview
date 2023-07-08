<script setup lang="ts">
import { createSecureServer } from "http2"

const user = useSupabaseUser()
const { data: flashcards, refresh } = await useFetch("/api/cards", {
    query: { id: user.value?.id },
})

const quiz = useState<boolean>("quiz")
const currentNote = useState<string | null>("currentNote")
const val = ref<number>(0)
watch(currentNote, () => {
    if (currentNote === null) quiz.value = false
})

// const { data: note, refresh: refreshNotes } = await useFetch("/api/noteById", {
//     query: { id: currentNote },
// })

const { data: note, error, refresh: refreshNotes } = await useAsyncData(
    `get_note${currentNote}`,
    () =>
        $fetch("/api/noteById", {
            query: { id: currentNote.value as string },
        }),
    {
        watch: [currentNote],
    }
)

console.log("card: ", note.value)

const incrementVal = () => {
    if (val.value + 1 >= note.value.cards.length) val.value = 0;
    else val.value++
    console.log("val: ", val.value)
}

const decrementVal = () => {
    if (val.value - 1 < 0) val.value = note.value.cards.length - 1
    else val.value--
    console.log("val: ", val.value)
}

const createCard = async () => {
    console.log("nothing here to see :)")
    const { data: cards } = await useAsyncData(
        `get_cards_${note.value?.id}`,
        () =>
            $fetch("/api/cards", {
                method: "POST",
                body: {
                    id: note.value?.id,
                    text: note.value?.content,
                },
            })
    )
    await refreshNotes()
}
</script>

<template>
    <NoteModal open-def="flashcard">
        <div class="p-5 py-10 flex flex-col items-center gap-5 h-full relative">
            <div class="flex-none flex justify-between w-[90%] items-center">
                <h2 class="text-4xl text-slate-400 font-semibold">
                    {{ note?.title }}: Your Flashcards
                </h2>
                <div
                    class="group relative flex flex-row items-center transition ease-in-out duration-300 hover:-translate-y-1 hover:opacity-[0.85] w-56 h-24">
                    <button
                        class="bg-gradient-to-br from-blue-300 to-pink-300 py-2 px-4 flex justify-center items-center blur-xl w-56 h-full absolute"></button>
                    <div class="group-hover:shadow-lg duration-300 transition ease-in-out bg-slate-800 text-white text-2xl font-light py-3 px-5 rounded-lg items-center h-14 w-52 cursor-pointer text-center z-20 absolute left-4 top-5"
                        @click="() => void createCard()">
                        Make Flashcards
                    </div>
                </div>
            </div>
            <div v-if="!note.cards || (note.cards && note.cards.length === 0)"
                class="grow flex justify-center items-center text-4xl text-slate-400 font-semibold w-full">
                No Flashcards Yet, Generate Some Above ⬆
            </div>
            <div v-else class="grow flex justify-center items-center gap-4 w-full">
                <span class="p-5 hover:bg-slate-100 rounded-xl z-20" @click="decrementVal">
                    <font-awesome-icon icon="fa-solid fa-caret-left" class="text-5xl" />
                </span>
                <div :class="`w-[700px] max-w-[80%] aspect-video duration-300 overflow-hidden`">
                    <div :class="`flex flex-nowrap w-[${note.cards?.length * 100}%] h-full relative duration-300 gap-4 px-4`" :style="`left: -${val*100}%`">
                        <Card v-for="card in note.cards" />
                        <!-- {{ note.cards.length * 100 }} -->
                    </div>
                </div>
                <span class="p-5 hover:bg-slate-100 rounded-xl z-20" @click="incrementVal">
                    <font-awesome-icon icon="fa-solid fa-caret-right" class="text-5xl" />
                </span>
            </div>
        </div>
    </NoteModal>
</template>
