<script setup lang="ts">
type OEState = {
    type: "oe"
    question: string
    content: string
}

defineProps<{
    question: OEState
    index: number
}>()
</script>

<template>
    <div class="w-full h-full p-10 flex flex-col gap-5">
        <div class="flex-none">
            <p class="text-5xl font-bold text-slate-800">Question: {{ index }}</p>
        </div>
        <div class="flex-none h-6" />
        <div class="flex-none">
            <p class="font-medium text-slate-400 text-xl">{{ question.question.split(";")[1].split(":")[1] }}</p>
        </div>
        <div class="flex-none h-4" />
        <div class="flex-none h-px w-[100%] bg-gradient-to-r from-pink-300 to-blue-300"></div>
        <div class="flex-none h-2" />
        <div class="grow w-full flex justify-center">
            <textarea class="w-[90%] h-full outline-none outline-transparent border-0 appearance-none" style="resize: none" placeholder="Your Answer Here..." />
        </div>
    </div>
</template>