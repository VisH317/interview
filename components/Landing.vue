<script setup>

const signup = useState("signup-modal")

</script>

<template>
    <div class="w-full bg-slate-200 pt-[10%] flex flex-col items-center gap-14 overflow-x-hidden pb-24">
        <h1 class="font-bold text-slate-800 text-7xl w-[55%] text-center">Your Personal AI Interview <span
                class="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-pink-300">Assistant</span></h1>
        <p class="text-slate-400 text-xl w-[30%] text-center font-light">Generate interview notes automatically from websites and videos to create practice interview questions with explanations</p>
        <Button text="Get Started" :action="() => { signup = true }" />
        <div
            class="group h-80 aspect-video bg-gradient-to-tr from-blue-200 to-pink-200 rounded-lg relative top-8 left-8 hover:translate-x-1 hover:translate-y-1 duration-300">
            <div
                class="h-full w-full bg-gradient-to-tr from-blue-300 to-pink-300 rounded-lg relative -top-4 -left-4 group-hover:-translate-y-2 group-hover:-translate-x-2 duration-300">
                <div
                    class="h-full w-full bg-slate-400 rounded-lg relative -top-4 -left-4 group-hover:-translate-y-3 group-hover:-translate-x-3 duration-300">

            </div>
        </div>
    </div>
</div></template>