<script setup lang="ts">
type FAQ = { title: string, desc: string }

const faqs: FAQ[] = [
    {
        title: "How does InterviewSense write my notes?",
        desc: "First, you paste in your job description. From there, we'll analyze it to create a to do list of things you need to know for your interview. From there, you can write your own notes or paste in website links. We'll take those links and generate organized notes from them for you to look over"
    },
    {
        title: "How do I create practice interview questions?",
        desc: "We'll use the notes generated before to create practice interview questions for you. You can generate a quiz with open ended and multiple choice interview questoins, which are generated using interview question data and info from your notes"
    },
    {
        title: "Faq 3",
        desc: ""
    },
]
</script>

<template>
    <div class="w-full bg-white min-[500px]:p-20 max-[500px]:py-20 max-[500px]:px-5 min-[500px]:pl-48 flex flex-col gap-16">
        <p class="text-5xl font-bold text-slate-800 max-[500px]:text-center">Frequently Asked Questions</p>
        <div class="flex flex-col">
            <FaqItem v-for="faq in faqs" :title="faq.title" :desc="faq.desc"/>
        </div>
    </div>
</template>