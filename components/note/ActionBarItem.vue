<script setup lang="ts">
defineProps<{
    text: string
    expand: boolean
    icon: string
}>()
</script>

<template>
    <div :class="`w-full flex ${expand ? 'justify-start' : 'justify-start'} items-center p-3 py-3 text-white cursor-pointer duration-300 gap-5 hover:bg-[rgba(0,0,0,0.1)] rounded-[15px]`">
        <div class="w-8">
            <font-awesome-icon
                :icon="`fa-solid fa-${icon}`"
                class="text-3xl text-white mx-auto"
            />
        </div>
        <span :class="`${expand ? 'inline opacity-100' : 'hidden opacity-0'} duration-300 text-xl delay-300 font-medium whitespace-nowrap`">{{ text }}</span>
    </div>
</template>
