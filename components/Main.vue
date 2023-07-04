<script setup lang="ts">
const currentNote = useState<string | null>('currentNote')
</script>

<template>
    <div class="w-full h-screen overflow-x-hidden overflow-y-auto flex flex-col items-center relative">
        <!-- <div class="w-full h-16 bg-slate-50">

        </div> -->
        <div class="flex flex-col w-[1000px] max-w-[80%] gap-10 relative top-80" v-if="currentNote === null">
            <h1 class="text-slate-800 text-6xl font-semibold relative left-6">Welcome! 🎉</h1>
            <p class="text-xl text-slate-400 font-normal">Get started by creating a note page or opening one you've already
                created. <br><br>Add information from websites, scan book pages, or open videos to take notes in seconds!
                <br><br>Prepare in just a couple minutes by creating a quiz or flashcards, or talking to your personal AI
                tutor. Good luck :)
            </p>
        </div>
        <div class="flex flex-col w-[1000px] max-w-[80%] min-h-screen gap-10 relative top-10 border-black" v-else>
            <NoteEditor />
        </div>
    </div>
    <Quiz />
    <Flashcard />
</template>