<script setup lang="ts">
defineProps<{
    main: boolean
    text: string
    ischeck: boolean
}>()
</script>

<template>
    <div class="flex-none flex justify-start gap-6 items-center">
        <div>
            <font-awesome-icon :icon="`fa-solid ${ischeck ? 'fa-check' : 'fa-x'}`" :class="`${main ? 'text-white' : 'text-slate-500'} text-xl`"/>
        </div>
        <p :class="`font-light text-2xl ${main ? 'text-white' : 'text-slate-600'}`">{{ text }}</p>
    </div>
</template>