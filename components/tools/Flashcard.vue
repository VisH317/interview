<script setup lang="ts">
const user = useSupabaseUser()
const { data: flashcards, refresh } = await useFetch("/api/cards", {
    query: { id: user.value?.id },
})

const flashcard = useState<boolean>("flashcard")
const currentNote = useState<string | null>("currentNote")
const val = ref<number>(0)
watch(currentNote, () => {
    if (currentNote === null) flashcard.value = false
})

// const { data: note, refresh: refreshNotes } = await useFetch("/api/noteById", {
//     query: { id: currentNote },
// })

const {
    data: note,
    error,
    refresh: refreshNotes,
} = await useAsyncData(
    `get_note${currentNote}`,
    () =>
        $fetch("/api/noteById", {
            query: { id: currentNote.value as string },
        }),
    {
        watch: [currentNote],
    }
)


const incrementVal = () => {
    if (val.value + 1 >= (note.value?.cards.length as number)) val.value = 0
    else val.value++
}

const decrementVal = () => {
    if (val.value - 1 < 0) val.value = (note.value?.cards.length as number) - 1
    else val.value--
}

const createCard = async () => {
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
        <div class="p-5 py-10 flex flex items-center gap-5 h-full relative">
            <div
                class="flex-none flex w-[30%] h-full rounded-[15px] bg-slate-600 items-center flex-col justify-center gap-10"
            >
                <h2 class="text-4xl text-slate-400 font-semibold">
                    {{ note?.title }}
                </h2>
                <div class="flex flex-col gap-5 items-center w-full">
                    <button
                        class="group bg-gradient-to-r w-[50%] disabled:bg-slate-500 justify-center from-pink-300 h-14 to-blue-300 items-center px-8 py-3 enabled:hover:-translate-y-1 duration-300 text-white font-light text-2xl cursor-pointer flex gap-4 rounded-[15px]"
                        @click="() => $emit('submit')"
                    >
                        New Cards
                    </button>
                    <button
                        class="group bg-slate-500 w-[50%] justify-center items-center px-8 py-2 h-14 hover:-translate-y-1 duration-300 text-slate-400 font-light text-2xl cursor-pointer flex gap-4 rounded-[15px]"
                        @click="() => $emit('back', active + 1)"
                    >
                        <!-- <font-awesome-icon icon="fa-solid fa-caret-right" class="text-white text-4xl"/> -->
                        Back
                    </button>
                </div>
            </div>
            <div
                v-if="!note?.cards || (note.cards && note.cards.length === 0)"
                class="grow flex justify-center items-center text-4xl text-slate-400 font-semibold w-full"
            >
                No Flashcards Yet, Generate Some Above ⬆
            </div>
            <div
                v-else
                class="grow flex justify-center items-center gap-4 w-full"
            >
                <span
                    class="p-5 hover:bg-slate-100 rounded-xl z-20"
                    @click="decrementVal"
                >
                    <font-awesome-icon
                        icon="fa-solid fa-caret-left"
                        class="text-5xl"
                    />
                </span>
                <div
                    :class="`w-[700px] max-w-[80%] aspect-video duration-300 overflow-hidden`"
                >
                    <div
                        :class="`flex flex-nowrap w-[${
                            note.cards?.length * 100
                        }%] h-full relative duration-300 gap-4 px-4`"
                        :style="`left: -${val * 100}%`"
                    >
                        <Card
                            v-for="card in note.cards"
                            :key="card"
                            :term="card.split(':')[0].replace(/^\s+|\s+$/g, '')"
                            :def="card.split(':')[1].replace(/^\s+|\s+$/g, '')"
                        />
                        {{ note.cards.length * 100 }}
                    </div>
                </div>
                <span
                    class="p-5 hover:bg-slate-100 rounded-xl z-20"
                    @click="incrementVal"
                >
                    <font-awesome-icon
                        icon="fa-solid fa-caret-right"
                        class="text-5xl"
                    />
                </span>
            </div>
        </div>
    </NoteModal>
</template>
