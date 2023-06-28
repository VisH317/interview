<script setup>
    const currentNote = useState<string | null>("currentNote")

    const { data: note, refresh } = useFetch('/api/noteById', { query: currentNote.value })


</script>

<template>
    <div class="flex flex-col w-[1000px] max-w-[80%] gap-10 relative top-60" v-if="currentNote!==null">

    </div>
</template>