<script setup lang="ts">
defineProps<{
    main: boolean,
    price: number,
    points: string[]
}>()
</script>

<template>
    <div
        :class="`${main ? 'bg-gradient-to-br from-blue-300 to-pink-300' : 'bg-slate-300'} w-[40%] rounded-lg py-10 px-10 flex flex-col gap-10`">
        <div class='flex-none'>
            <h1 :class="`text-${main ? 'white' : 'slate-800'} text-5xl font-semibold text-center`">${{ price.toString() }} /
                month</h1>
        </div>
        <div v-for="(point) in points" class="flex-none flex justify-start gap-5 items-center">
            <font-awesome-icon icon="fa-solid fa-check" :class="`${main ? 'text-white' : 'text-slate-500'} text-xl`"/>
            <div>
                <p :class="`font-light text-2xl ${main ? 'text-white' : 'text-slate-600'}`">{{ point }}</p>
            </div>
        </div>
        <div class="grow" />
        <div class="w-full flex justify-center">
            <Button text="Join" :action="() => console.log('action')" />
    </div>
</div></template>