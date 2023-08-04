<script setup lang="ts">
defineProps<{
    title: string
    desc: string
}>()

const open = ref<boolean>(false)
</script>

<template>
    <div class="w-[700px]" @click="open = !open">
        <div class="p-5 flex justify-between px-5 bg-slate-200">
            <p class="text-2xl text-slate-800 font-semibold">{{ title }}</p>
            <font-awesome-icon :icon="`fa-solid ${open ? 'fa-minus' : 'fa-plus'}`" class="text-2xl text-slate-800 font-semibold flex items-center border-2 border-transparent"/>
        </div>
        <div :class="`${open ? 'opacity-100 h-48' : 'opacity-100 h-0 text-[0px]'} p-1 duration-300`">
            {{ desc }}
        </div>
    </div>
</template>