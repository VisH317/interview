<script setup lang="ts">
const props = defineProps<{
    imgPath: string
    quote: string
    desc: string
}>()
</script>

<template>
    <div class="w-1/3 h-full p-5 flex flex-col gap-4">
        <nuxt-img :src="imgPath" height="50px" width="50px" class="rounded-[50%]"/>
        <p class="font-semibold text-xl text-slate-800">"{{ quote }}"</p>
        <p class="text-lg font-light text-slate-500">— {{ desc }}</p>
    </div>
</template>