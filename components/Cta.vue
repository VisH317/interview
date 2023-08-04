<script setup lang="ts">
const signup = useState("signup-modal")
</script>

<template>
    <div class="w-full p-4 bg-white">
        <div class="w-full bg-slate-800 h-[400px] max-[500px]:h-[450px] rounded-xl min-[500px]:px-12 max-[500px]:p-2 py-8 flex flex-col gap-6 min-[500px]:pl-40">
            <div class="w-2/3 p-5">
                <p class="text-5xl max-[500px]:text-3xl leading-normal text-white bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300 font-medium">Try InterviewSense Now</p>
            </div>
            <p class="text-xl max-[500px]:w-[90%] max-[500px]:text-lg text-slate-400 font-light ml-5">Prepare for your interview in minutes using our tools, and save your time for the more enjoyable parts of life :)</p>
            <div class="h-4"/>
            <div
                class="ml-5 group w-48 justify-center bg-gradient-to-r from-pink-300 to-blue-300 items-center px-4 py-4 hover:-translate-y-1 duration-300 text-white font-medium text-xl cursor-pointer flex gap-4 rounded-xl"
                @click="() => signup=true"
            >
                <div>Save Your Time</div>
            </div>
        </div>
    </div>
</template>