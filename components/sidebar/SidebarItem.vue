<script setup lang="ts">
defineProps<{
    icon: string
    text: string
}>()
defineEmits<{
    (eventName: "select", hovering: boolean): void | Promise<void>
}>()
</script>

<template>
    <div
        class="w-full p-5 hover:bg-slate-300 duration-300 text-slate-400 font-normal text-xl cursor-pointer flex gap-4"
        @click="() => $emit('select')"
    >
        <div class="inline">
            <font-awesome-icon :icon="`fa-solid fa-${icon}`" />
        </div>
        {{ text }}
    </div>
</template>
