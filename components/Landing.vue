<script setup>
</script>

<template>
    <div class="w-full h-[90vh] bg-slate-200 pt-[10%] flex flex-col items-center gap-14 overflow-x-hidden">
        <h1 class="font-bold text-slate-800 text-7xl w-[55%] text-center">Your Personal Interview <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-pink-300">Assistant</span> Powered by AI</h1>
        <p class="text-slate-400 text-2xl w-[30%] text-center font-light">No more costly courses, long blog posts, and endless rabbit holes. Just a couple clicks and a couple minutes</p>
        <Button text="Get Started"/>
        <div class="group h-96 aspect-video bg-gradient-to-tr from-blue-200 to-pink-200 rounded-lg relative top-8 left-8 hover:translate-x-1 hover:translate-y-1 duration-300">
            <div class="h-full w-full bg-gradient-to-tr from-blue-300 to-pink-300 rounded-lg relative -top-4 -left-4 group-hover:-translate-y-2 group-hover:-translate-x-2 duration-300">
                <div class="h-full w-full bg-slate-400 rounded-lg relative -top-4 -left-4 group-hover:-translate-y-3 group-hover:-translate-x-3 duration-300">
                
                </div>    
            </div>
        </div>
        <Modal/>
    </div>
</template>