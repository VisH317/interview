<script setup lang="ts">
const currentNote = useState<string | null>("currentNote")
const currentNoteLoading = useState<boolean>("currentNoteLoading")

defineEmits<{
    (e: "create-note", name: string, desc: string): Promise<void>
}>()
</script>

<template>
    <div
        class="w-full h-screen overflow-x-hidden overflow-y-auto bg-white flex flex-col items-center relative"
    >
        <!-- <div class="w-full h-16 bg-slate-50">

        </div> -->
        <Welcome
            v-if="currentNote === null && !currentNoteLoading"
            @create-note="(name: string, desc: string) => void $emit('create-note', name, desc)"
        />
        <div
            v-else-if="currentNoteLoading"
            class="flex justify-center items-center w-full h-screen"
        >
            <div class="flex flex-col w-[50%] gap-5">
                <SkeletonLoader class="h-20 w-1/2" />
                <div class="h-2" />
                <div class="flex flex-col gap-2 w-full">
                    <SkeletonLoader class="h-6 w-[83%]" />
                    <SkeletonLoader class="h-6 w-[82%]" />
                    <SkeletonLoader class="h-6 w-[82%]" />
                    <SkeletonLoader class="h-6 w-[82%]" />
                    <SkeletonLoader class="h-6 w-[40%]" />
                </div>
                <div class="h-2"/>
                <div class="flex flex-col gap-2 w-full">
                    <SkeletonLoader class="h-6 w-[80%]" />
                    <SkeletonLoader class="h-6 w-[80%]" />
                    <SkeletonLoader class="h-6 w-[40%]" />
                </div>
                <div class="h-2" />
                <div class="w-[80%] flex justify-end mx-10">
                    <SkeletonLoader class="h-12 w-[20%]" />
                </div>
            </div>
        </div>
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
    <Website />
</template>
