<script setup lang="ts">
const currentNote = useState<string>("currentNOte")

const { data: note } = useFetch("/api/noteById", {
    query: { id: currentNote.value as string },
})
console.log("aowiefjaosidjflsakfjeoijf currentNOte: ", note)
</script>

<template>
    <div class="fixed -top-[500px] right-10 w-[450px] hover:top-0 duration-300">
        <div class="h-[500px] bg-slate-100 p-5 pt-10">
            <div class="w-full flex justify-center">
                <p class="text-5xl font-bold">
                    To Do
                    <span
                        class="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300"
                        >List</span
                    >
                </p>
                <div class="h-2"/>
                <ul>
                    <li v-for="todo in note.todo">{{ todo }}</li>
                </ul>
            </div>
        </div>
        <div class="h-16 rounded-b-[15px] bg-slate-300"></div>
    </div>
</template>
