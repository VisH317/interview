<script setup>

</script>

<template>
    <div class="w-full bg-slate-300 p-10 py-20 flex justify-center items-center h-[300px] max-[500px]:h-[450px] max-[500px]:flex-col max-[500px]:gap-10">
        <div class="w-[30%] min-[500px]:border-r-2 h-[100%] flex items-center justify-center border-slate-400">
            <p class="text-slate-800 font-bold text-4xl text-center">Interview<span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300">Sense</span></p>
        </div>
        <div class="w-[30%] flex flex-col items-center justify-center gap-10">
            <nuxt-link to="/about"
                class="text-slate-900 font-light text-2xl duration-300 hover:text-slate-400">About</nuxt-link>
            <nuxt-link to="/about"
                class="text-slate-900 font-light text-2xl duration-300 hover:text-slate-400">Pricing</nuxt-link>
            <Button :action="click" text="Join Now" />
        </div>
</div></template>