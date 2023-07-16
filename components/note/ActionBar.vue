<script setup lang="ts">

</script>

<template>
    <div class="absolute -bottom-[8%] p-3 w-20 right-[10%] h-[48%] rounded-t-[60px] pt-10 bg-gradient-to-b from-pink-300 to-blue-300">
        <div class="flex flex-col gap-8">
            <action-bar-item icon="globe" text="BRUH" :expand="false" />
            <action-bar-item icon="camera" text="BRUH" :expand="false" />
        </div>
        <hr class="h-[1px] my-8 bg-white border-0 dark:bg-white" />
        <div class="flex flex-col gap-8">
            <action-bar-item icon="id-card" text="BRUH" :expand="false" />
            <action-bar-item icon="check-circle" text="BRUH" :expand="false" />
        </div>
    </div>
</template>