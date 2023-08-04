<script setup>

const signup = useState("signup-modal")

</script>

<template>
    <div class="w-full bg-slate-200 pt-[13%] max-[500px]:pt-[150px] flex flex-col items-center gap-12 overflow-x-hidden pb-24">
        <h1 class="font-bold text-slate-800 text-7xl w-[55%] max-[500px]:w-[90%] max-[500px]:text-4xl text-center leading-[1.125]">Prepare for Interviews in <span
                class="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-pink-300">Minutes,   </span> not Hours</h1>
        <p class="text-slate-400 text-xl w-[30%] max-[500px]:w-[80%] text-center font-light">InterviewSense is an app that makes organized interview notes and practice questions with feedback...just by pasting in your job description</p>
        <div class="flex justify-center items-center gap-8 max-[500px]:gap-4 pr-5">
            <Button text="Try it Out" :action="() => { signup = true }" />
            <button class="w-40 max-[500px]:w-36 h-14 rounded-lg relative top-1 border-2 border-slate-800 text-xl hover:border-slate-300 hover:bg-slate-300 duration-300">Tell me More</button>
        </div>
        <div class="h-4"/>
        <div
            class="group h-80 max-[500px]:h-44 aspect-video bg-gradient-to-tr from-blue-200 to-pink-200 rounded-lg relative top-8 max-[500px]:left-4 max-[500px]:top-4 left-8 hover:translate-x-1 hover:translate-y-1 duration-300">
            <div
                class="h-full w-full bg-gradient-to-tr from-blue-300 to-pink-300 rounded-lg relative -top-4 max-[500px]:-left-2 max-[500px]:-top-2 -left-4 group-hover:-translate-y-2 group-hover:-translate-x-2 duration-300">
                <div
                    class="h-full w-full bg-slate-400 rounded-lg relative -top-4 -left-4 group-hover:-translate-y-3 group-hover:-translate-x-3 max-[500px]:-left-2 max-[500px]:-top-2 duration-300">

            </div>
        </div>
    </div>
</div></template>