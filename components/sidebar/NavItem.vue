<script setup lang="ts">
const props = defineProps<{
    title: string
    id: number
    uuid: string
}>()

const clicked = ref<boolean>(false)

const currentNote = useState<string | null>("currentNote")

const setClick = () => {
    clicked.value = !clicked.value
    if (clicked.value) currentNote.value = props.uuid
    else currentNote.value = null
}

const flashcard = useState<boolean>("flashcard")
const quiz = useState<boolean>("quiz")
// const progress = useState<boolean>("progress")

watch(currentNote, () => {
    if (currentNote.value !== null && currentNote.value === props.uuid) {
        clicked.value = true
    } else {
        clicked.value = false
        flashcard.value = false
        quiz.value = false
        // progress.value = false
    }
})
</script>

<template>
    <div
        :class="`group w-full p-5 hover:bg-slate-300 items-center duration-300 text-slate-600 font-medium text-xl cursor-pointer flex gap-4 rounded-[20px] ${
            clicked ? 'bg-slate-300' : ''
        }`"
        @click="setClick"
    >
        <div
            :class="`flex-none ${
                clicked ? 'inline' : 'inline'
            } duration-300 text-2xl`"
        >
            <font-awesome-icon icon="fa-solid fa-sticky-note" />
        </div>
        <p class="flex-none font-medium text-lg">{{ title }}</p>
        <div class="grow" />
        <div
            class="opacity-0 group-hover:opacity-100 duration-300"
            @click.stop="() => $emit('delete')"
        >
            <font-awesome-icon
                icon="fa-solid fa-trash"
                :class="`hover:text-red-500 duration-300 text-xl hidden`"
            />
        </div>
    </div>
    <!-- <div
        :class="`w-full hover:delay-0 hover:bg-slate-300 duration-300 text-slate-400 flex items-center font-normal text-xl cursor-pointer flex ${clicked ? 'block opacity-100 p-3 h-12' : ' opacity-0 p-0 h-0 duration-300'} `">
        <div class="duration-300 m-4 flex gap-2"><font-awesome-icon icon="fa-solid fa-check-circle" /></div> <span
            class="">See Progress</span>
    </div>
    <div :class="`w-full hover:delay-0 hover:bg-slate-300 duration-300 text-slate-400 font-normal flex items-center text-xl cursor-pointer flex ${clicked ? 'block opacity-100 p-3 h-12' : ' opacity-0 p-0 h-0'} delay-75 duration-300`"
        @click="() => flashcard = true">
        <div class="duration-300 m-4 flex gap-2"><font-awesome-icon icon="fa-solid fa-id-card" /></div> <span
            class="">Flashcards</span>
    </div>
    <div :class="`w-full hover:delay-0 hover:bg-slate-300 duration-300 text-slate-400 font-normal flex items-center text-xl cursor-pointer flex ${clicked ? 'block opacity-100 p-3 h-12' : ' opacity-0 p-0 h-0'} delay-150 duration-300`"
        @click="() => { quiz = true }">
        <div class="duration-300 m-4 flex gap-2"><font-awesome-icon icon="fa-solid fa-pencil" /></div> <span
            class="">Quizzes</span>
    </div>
    <div
        :class="`w-full hover:delay-0 hover:bg-slate-300 duration-300 text-slate-400 font-normal flex items-center text-xl cursor-pointer flex ${clicked ? 'block opacity-100 p-3 h-12' : ' opacity-0 p-0 h-0'} delay-[225ms] duration-300`">
        <div class="duration-300 m-4 flex gap-2"><font-awesome-icon icon="fa-solid fa-chalkboard-teacher" /></div> <span
            class="">Tutor</span>
</div> -->
</template>
