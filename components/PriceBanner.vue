<script setup lang="ts">
defineProps<{
    main: boolean,
    price: string,
    points: string[],
    exes: string[]
}>()
</script>

<template>
    <div
        :class="`${main ? 'bg-gradient-to-br from-blue-300 to-pink-300' : 'bg-slate-300'} w-[45%] rounded-lg min-[500px]:py-10 min-[500px]:px-10 max-[500px]:p-5 flex flex-col gap-10 max-[500px]:w-full`">
        <div class='flex-none'>
            <h1 :class="`text-${main ? 'white' : 'slate-800'} text-5xl font-semibold text-center`">${{ price }} /
                month</h1>
        </div>
        <PriceListItem v-for="point in points" ischeck :main="main" :text="point" />
        <PriceListItem v-for="ex in exes" :ischeck="false" :main="main" :text="ex" />
        <div class="grow" />
        <div class="w-full flex justify-center">
            <Button text="Join" :action="() => console.log('action')" />
    </div>
</div></template>