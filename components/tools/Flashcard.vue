<script setup lang="ts">
const user = useSupabaseUser()
const flashcard = useState<boolean>("quiz")
const currentNote = useState<string | null>("currentNote")
const val = ref<number>(0)
watch(currentNote, () => {
    if (currentNote === null) flashcard.value = false
})

const { data: upgraded } = await useFetch("/api/user", {
    query: { id: user.value?.id },
})

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
console.log("note: ", note.value === "")

const incrementVal = () => {
    if (val.value + 1 >= (note.value?.cards.length as number)) val.value = 0
    else val.value++
}

const decrementVal = () => {
    if (val.value - 1 < 0) val.value = (note.value?.cards.length as number) - 1
    else val.value--
}

const createCard = async () => {
    if (!upgraded && (note.value?.cards.length as number) >= 50) {
        alert(
            "You are currently on the free plan, upgrade to create more than 50 flashcards"
        )
        return
    }

    console.log("creating card...")

    const { data: cards } = await useAsyncData(
        `get_cards_${note.value?.id}`,
        () =>
            $fetch("/api/cards", {
                method: "POST",
                body: {
                    id: note.value?.id,
                    userid: user.value?.id,
                    text: note.value?.content,
                },
            })
    )
    await refreshNotes()
}
</script>

<template>
    <NoteModal open-def="flashcard">
        <div class="p-5 py-5 flex flex items-center gap-5 h-full relative">
            <div
                v-if="note!==''"
                class="flex-none flex w-[30%] h-full rounded-[15px] bg-slate-600 items-center flex-col justify-center gap-10 select-none"
            >
                <h2 class="text-4xl text-slate-400 font-semibold">
                    {{ note?.title }}
                </h2>
                <div class="flex flex-col gap-5 items-center w-full">
                    <button
                        v-if="!upgraded && note?.cards.length as number >= 50"
                        v-tippy="'Upgrade to get more cards'"
                        :disabled="true"
                        class="group bg-gradient-to-r w-[50%] disabled:bg-slate-500 justify-center from-pink-300 h-14 to-blue-300 items-center px-8 py-3 enabled:hover:-translate-y-1 duration-300 text-white font-light text-2xl cursor-pointer flex gap-4 rounded-[15px]"
                    >
                        New Cards
                    </button>
                    <button
                        v-else
                        class="group bg-gradient-to-r w-[50%] disabled:bg-slate-500 justify-center from-pink-300 h-14 to-blue-300 items-center px-8 py-3 enabled:hover:-translate-y-1 duration-300 text-white font-light text-2xl cursor-pointer flex gap-4 rounded-[15px]"
                        @click="() => void createCard()"
                    >
                        New Cards
                    </button>

                    <button
                        class="group bg-slate-500 w-[50%] justify-center items-center px-8 py-2 h-14 hover:-translate-y-1 duration-300 text-slate-400 font-light text-2xl cursor-pointer flex gap-4 rounded-[15px]"
                        @click="flashcard = false"
                    >
                        <!-- <font-awesome-icon icon="fa-solid fa-caret-right" class="text-white text-4xl"/> -->
                        Back
                    </button>
                </div>
            </div>
            <div
                v-if="!note?.cards || (note.cards && note?.cards.length === 0)"
                class="grow flex justify-center items-center text-2xl text-slate-400 font-medium w-full"
            >
                <p>
                    No Flashcards Yet,
                    <span
                        class="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300 hover:from-pink-200 hover:to-blue-200 cursor-pointer"
                        @click="() => void createCard()"
                        >Generate Some</span
                    >
                </p>
            </div>
            <div
                v-else
                class="flex flex-col items-center w-[70%] gap-10 h-full py-12"
            >
                <div class="flex-none flex justify-center select-none">
                    <p class="text-5xl font-bold text-slate-800">
                        Your
                        <span
                            class="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300"
                            >Flashcards</span
                        >
                    </p>
                </div>
                <div class="grow flex justify-center items-center gap-4 w-full">
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
                            :class="`grow flex w-[${
                                note.cards?.length * 100
                            }%] h-full relative duration-300`"
                            :style="`left: -${val * 100}%`"
                        >
                            <Card
                                v-for="card in note.cards"
                                :key="card"
                                :term="
                                    card.split(':')[0].replace(/^\s+|\s+$/g, '')
                                "
                                :def="
                                    card.split(':')[1].replace(/^\s+|\s+$/g, '')
                                "
                            />
                            <!-- {{ note.cards.length * 100 }} -->
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
                <div
                    class="flex-none flex flex-col items-center gap-5 select-none w-full"
                >
                    <div>
                        <p class="text-5xl font-semibold text-slate-800">
                            <span
                                class="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300"
                                >{{ val + 1 + "/" + note.cards?.length }}</span
                            >
                        </p>
                    </div>
                    <div
                        class="relative w-[90%] h-6 overflow-hidden rounded-2xl"
                    >
                        <div
                            class="absolute top-0 z-10 left-0 w-full h-full bg-gradient-to-r from-slate-100 to-slate-200"
                        />
                        <div
                            :class="`absolute top-0 left-0 h-full bg-gradient-to-r z-50 from-pink-300 to-blue-300 rounded-2xl duration-300`"
                            :style="{
                                width: `${Math.round(
                                    ((val + 1) / note.cards?.length) * 100
                                )}%`,
                            }"
                        />
                        {{
                            `w-[${Math.round(
                                ((val + 1) / note.cards?.length) * 100
                            )}%]`
                        }}
                    </div>
                </div>
            </div>
        </div>
    </NoteModal>
</template>
