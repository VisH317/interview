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
        <div v-for="(point) in points" class="flex-none">
            <div class="flex justify-start gap-5 items-center">
                <font-awesome-icon icon="fa-solid fa-check" :class="`${main ? 'text-white' : 'text-slate-500'} text-xl`"/>
                <div>
                    <p :class="`font-light text-2xl ${main ? 'text-white' : 'text-slate-600'}`">{{ point }}</p>
                </div>
            </div>
        </div>
        <div v-for="(ex) in exes" class="flex-none flex justify-start gap-5 items-center">
            <div class="flex justify-start gap-5 items-center">
                <font-awesome-icon icon="fa-solid fa-x" :class="`${main ? 'text-white' : 'text-slate-400'} text-xl`"/>
                <div>
                    <p :class="`font-light text-2xl ${main ? 'text-white' : 'text-slate-400'}`">{{ ex }}</p>
                </div>
            </div>
        </div>
        <div class="grow" />
        <div class="w-full flex justify-center">
            <Button text="Join" :action="() => console.log('action')" />
    </div>
</div></template>