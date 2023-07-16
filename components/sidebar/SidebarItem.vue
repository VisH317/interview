<script setup lang="ts">
defineProps<{
    icon: string
    text: string
    anim?: string
}>()
defineEmits<{
    (eventName: "select", hovering: boolean): void | Promise<void>
}>()
</script>

<template>
    <div
        class="group w-full p-5 hover:bg-slate-300 duration-300 text-slate-600 font-medium text-xl cursor-pointer flex gap-4 rounded-[20px]"
        @click="() => $emit('select')"
    >
        <div class="inline">
            <font-awesome-icon :icon="`fa-solid fa-${icon}`" :class="`text-2xl font-bold ${anim}`" />
        </div>
        {{ text }}
    </div>
</template>
