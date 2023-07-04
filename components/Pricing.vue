<script setup lang="ts">
// price banner data

interface PB {
    price: number,
    main: boolean,
    points: string[]
}

const pb1: PB = {
    price: 19,
    main: false,
    points: [
        "Up to 40 note pages",
        "Up to 10 quizzes per month",
        "Up to 5 flashcard sets per month",
        "Up to 200 tutor messages per month"
    ]
}

const pb2: PB = {
    price: 29,
    main: true,
    points: [
        "Unlimited note pages",
        "Unlimited quizzes per month",
        "Unlimited flashcard sets per month",
        "Up to 5000 tutor messages per month"
    ]
}


</script>

<template>
    <div class="w-full bg-slate-200 flex flex-col p-10 py-20 items-center gap-20">
        <h1 class="text-6xl text-slate-800 text-center font-bold">Interview<span
                class='text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300'>Sense</span> Pricing</h1>
        <div class="flex justify-center gap-16">
            <PriceBanner :price="pb1.price" :main="pb1.main" :points="pb1.points" />
            <PriceBanner :price="pb2.price" :main="pb2.main" :points="pb2.points" />
        </div>
    </div>
</template>
