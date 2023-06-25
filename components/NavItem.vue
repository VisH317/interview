<script setup lang="ts">

    defineProps<{
        title: string,
        id: string
    }>()

    const clicked = ref<boolean>(false)
</script>

<template>
    <div class="w-full p-5 hover:bg-slate-300 duration-300 text-slate-400 font-normal text-xl cursor-pointer flex gap-4" @click="clicked=!clicked">
        <div :class="`${clicked ? 'rotate-90 inline' : 'inline'} duration-300`"><font-awesome-icon icon="fa-solid fa-caret-right"/></div> {{ title }}
    </div>
    <div :class="`w-full hover:bg-slate-300 duration-300 text-slate-400 font-normal text-xl cursor-pointer flex gap-4 ${clicked ? 'block opacity-100 p-3' : ' opacity-0 p-0 h-0'} duration-300`">-> See Progress</div>
    <div :class="`w-full hover:bg-slate-300 duration-300 text-slate-400 font-normal text-xl cursor-pointer flex gap-4 ${clicked ? 'block opacity-100 p-3' : ' opacity-0 p-0 h-0'} duration-300`">-> Learn</div>
    <div :class="`w-full hover:bg-slate-300 duration-300 text-slate-400 font-normal text-xl cursor-pointer flex gap-4 ${clicked ? 'block opacity-100 p-3' : ' opacity-0 p-0 h-0'} duration-300`">-> View/Gen Flashcards</div>
    <div :class="`w-full hover:bg-slate-300 duration-300 text-slate-400 font-normal text-xl cursor-pointer flex gap-4 ${clicked ? 'block opacity-100 p-3' : ' opacity-0 p-0 h-0'} duration-300`">-> Practice Quiz</div>
</template>