<script setup lang="ts">
// price banner data

interface PB {
    price: string,
    main: boolean,
    points: string[],
    exes: string[]
}

const pb1: PB = {
    price: "0",
    main: false,
    points: [
        "2 note pages",
        "5 quizzes per month",
        "50 flashcards per month",
    ],
    exes: [
        "Advanced Quiz Review",
        "Unlimited Flashcards",
        "Tutor Access"
    ]
}

const pb2: PB = {
    price: "9.99",
    main: true,
    points: [
        "100 note pages per month",
        "Unlimited quizzes",
        "Unlimited flashcards per month",
        "Advanced Quiz Review",
        "Up to 5000 tutor messages per month"
    ],
    exes: []
}


</script>

<template>
    <div class="w-full bg-slate-200 flex flex-col p-10 py-20 items-center gap-20">
        <h1 class="text-6xl text-slate-800 text-center font-bold max-[500px]:text-4xl">Interview<span
                class='text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300'>Sense</span> Pricing</h1>
        <div class="flex justify-center gap-16 max-[500px]:flex-col max-[500px]:p-2">
            <PriceBanner :price="pb1.price" :main="pb1.main" :points="pb1.points" :exes="pb1.exes"/>
            <PriceBanner :price="pb2.price" :main="pb2.main" :points="pb2.points" :exes="pb2.exes"/>
        </div>
    </div>
</template>
