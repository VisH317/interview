<script setup lang="ts">
const hover = ref<boolean>(false)
</script>

<template>
    <div class="absolute -bottom-[8%] p-3 right-[5%] h-[48%] rounded-t-[40px] w-20 pt-10 bg-gradient-to-b from-pink-300 to-blue-300 hover:w-60 duration-300" @mouseover="hover=true" @mouseout="hover=false">
        <div class="flex flex-col gap-8">
            <action-bar-item icon="globe" text="Add Website" :expand="hover" />
            <action-bar-item icon="camera" text="Add Video" :expand="hover" />
        </div>
        <hr class="h-[1px] my-8 bg-white border-0 dark:bg-white w-[80%] mx-auto" />
        <div class="flex flex-col gap-8">
            <action-bar-item icon="id-card" text="Flashcards" :expand="hover" />
            <action-bar-item icon="check-circle" text="Start Quiz" :expand="hover" />
        </div>
    </div>
</template>