<script setup>
    const click = () => console.log("test")
</script>

<template>
    <div class="w-full fixed border-black p-5 text-4xl font-semibold flex flex-row gap-10 justify-center items-center">
        <div class="flex flex-row gap-10 items-center w-3/12 cursor-pointer">
            <nuxt-img src="/logo.png" height="70px" width="70px"/>
            <p class="text-slate-800 font-semibold text-4xl">InterView</p>
        </div>
        <div class="flex flex-row gap-10 items-center w-1/6">
            <nuxt-link to="/about" class="text-slate-900 font-light text-2xl duration-300 hover:text-slate-400">About</nuxt-link>
            <nuxt-link to="/about" class="text-slate-900 font-light text-2xl duration-300 hover:text-slate-400">Pricing</nuxt-link>
            <Button :action="click" text="Join Now"/>
        </div>
    </div>
</template>