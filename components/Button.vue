<script setup lang="ts">
defineProps<{
    action: () => Promise<void>,
    text: string
}>()
</script>

<template>
    <div class="group relative flex flex-row items-center transition ease-in-out duration-300 hover:-translate-y-1 hover:opacity-[0.85]">
        <button class="bg-gradient-to-br from-blue-300 to-pink-300 py-2 px-4 flex justify-center items-center blur-xl w-48 h-24"></button>
        <div class="group-hover:shadow-lg duration-300 transition ease-in-out bg-slate-800 text-white text-2xl font-light py-3 px-5 rounded-lg items-center h-14 w-36 cursor-pointer text-center z-20 relative -left-40" @click="action">{{ text }}</div>
    </div>
</template>