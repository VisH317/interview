<script setup lang="ts">
const props = defineProps<{
    action: () => Promise<void> | void,
    text: string,
    width?: boolean
}>()
</script>

<template>
    <div
        class="group relative flex flex-row items-center transition ease-in-out duration-300 hover:-translate-y-1 hover:opacity-[0.85] w-48 h-16">
        <button
            class="bg-gradient-to-br from-blue-300 to-pink-300 py-2 px-4 flex justify-center items-center blur-xl w-48 h-full absolute"></button>
        <div class="group-hover:shadow-lg duration-300 transition ease-in-out bg-slate-800 h-14 text-white text-xl font-light py-3 px-5 rounded-lg flex justify-center items-center w-40 max-[500px]:w-36 cursor-pointer text-center z-20 absolute left-4 max-[500px]:left-6 top-2"
            @click="action">{{ text }}</div>
</div></template>