<script setup lang="ts">
const currentNote = useState<string | null>("currentNote")

defineEmits<{
    (e: "create-note", name: string, desc: string): Promise<void>
}>()
</script>

<template>
    <div
        class="w-full h-screen overflow-x-hidden overflow-y-auto flex flex-col items-center relative"
    >
        <!-- <div class="w-full h-16 bg-slate-50">

        </div> -->
        <Welcome
            v-if="currentNote === null"
            @create-note="(name: string, desc: string) => void $emit('create-note', name, desc)"
        />
        <div
            v-else
            class="flex flex-col w-full flex flex-col min-h-screen gap-10 relative"
        >
            <note-editor />
            <action-bar />
            <todos />
        </div>
    </div>
    <Quiz />
    <Flashcard />
</template>
