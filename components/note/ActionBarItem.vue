<script setup lang="ts">
defineProps<{
    text: string
    expand: boolean
    icon: string
}>()
</script>

<template>
    <div class="w-full flex justify-center items-center p-2 text-white">
        <font-awesome-icon
            :icon="`fa-solid fa-${icon}`"
            class="text-3xl text-white"
        />
    </div>
</template>
