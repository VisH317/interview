<script setup lang="ts">
const currentNote = useState<string | null>('currentNote')
</script>

<template>
    <div class="w-full h-screen overflow-x-hidden overflow-y-auto flex flex-col items-center relative">
        <!-- <div class="w-full h-16 bg-slate-50">

        </div> -->
        <Welcome v-if="currentNote === null" />
        <div class="flex flex-col w-[1400px] flex flex-col items-center max-w-[80%] min-h-screen gap-10 relative top-10 border-black"
            v-else>
            <NoteEditor />
        </div>
    </div>
    <Quiz />
    <Flashcard />
</template>