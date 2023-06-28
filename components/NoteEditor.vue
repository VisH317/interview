<script setup>
    const currentNote = useState<string | null>("currentNote")

</script>

<template>
    <div class="flex flex-col w-[1000px] max-w-[80%] gap-10 relative top-60" v-if="currentNote!==null">
        
    </div>
</template>