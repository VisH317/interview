<script setup lang="ts">

    const props = defineProps<{
        title: string,
        id: number,
        uuid: string
    }>()

    const clicked = ref<boolean>(false)

    const currentNote = useState<string>("currentNote")

    const setClick = () => {
        clicked.value = !clicked.value
        currentNote.value = props.uuid
    }

</script>

<template>
    <div class="w-full p-5 hover:bg-slate-300 duration-300 text-slate-400 font-normal text-xl cursor-pointer flex gap-4" @click="setClick">
        <div :class="`flex-none ${clicked ? 'rotate-90 inline' : 'inline'} duration-300`"><font-awesome-icon icon="fa-solid fa-caret-right"/></div> 
        <p class="flex-none">{{ title }}</p>
        <div class="grow"/>
        <div @click.stop="() => $emit('delete')"><font-awesome-icon icon="fa-solid fa-trash" :class="`hover:text-red-500 duration-300`"/></div>
    </div>
    <div :class="`w-full hover:delay-0 hover:bg-slate-300 duration-300 text-slate-400 flex items-center font-normal text-xl cursor-pointer flex ${clicked ? 'block opacity-100 p-3 h-12' : ' opacity-0 p-0 h-0 duration-300'} `"><div class="duration-300 m-4 flex gap-2"><font-awesome-icon icon="fa-solid fa-check-circle"/></div> <span class="">See Progress</span></div>
    <div :class="`w-full hover:delay-0 hover:bg-slate-300 duration-300 text-slate-400 font-normal flex items-center text-xl cursor-pointer flex ${clicked ? 'block opacity-100 p-3 h-12' : ' opacity-0 p-0 h-0'} delay-75 duration-300`"><div class="duration-300 m-4 flex gap-2"><font-awesome-icon icon="fa-solid fa-id-card"/></div> <span class="">View Flashcards</span></div>
    <div :class="`w-full hover:delay-0 hover:bg-slate-300 duration-300 text-slate-400 font-normal flex items-center text-xl cursor-pointer flex ${clicked ? 'block opacity-100 p-3 h-12' : ' opacity-0 p-0 h-0'} delay-150 duration-300`"><div class="duration-300 m-4 flex gap-2"><font-awesome-icon icon="fa-solid fa-pencil"/></div> <span class="">Create Quiz</span></div>
    <div :class="`w-full hover:delay-0 hover:bg-slate-300 duration-300 text-slate-400 font-normal flex items-center text-xl cursor-pointer flex ${clicked ? 'block opacity-100 p-3 h-12' : ' opacity-0 p-0 h-0'} delay-[225ms] duration-300`"><div class="duration-300 m-4 flex gap-2"><font-awesome-icon icon="fa-solid fa-chalkboard-teacher"/></div> <span class="">Tutor</span></div>
</template>