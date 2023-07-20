<script setup lang="ts">
const currentNote = useState<string>("currentNote")

const { data: note } = await useFetch("/api/noteById", {
    query: { id: currentNote.value as string },
})
console.log("aowiefjaosidjflsakfjeoijf currentNOte: ", note)
</script>

<template>
    <div class="fixed -top-[500px] right-10 w-[450px] hover:top-0 duration-300">
        <div class="h-[500px] bg-slate-100 py-5 pt-10">
            <div class="w-full h-full flex flex-col items-center">
                <div class="flex-none">
                    <p class="text-5xl font-bold">
                        To Do
                        <span
                            class="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300"
                            >List</span
                        >
                    </p>
                </div>
                <div class="h-2 flex-none" />
                <ul class="p-5 grow overflow-y-auto flex flex-col gap-5">
                    <div
                        v-for="todo in note?.todo"
                        :key="todo"
                        class="flex gap-3"
                    >
                        <input
                            :id="todo"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gradient-to-r from-white to-white border-gray-300 rounded focus:ring-blue-300 focus:ring-2 checked:from-blue-300 checked:to-pink-300"
                        />
                        <label :for="todo" class="text-slate-500 font-light">{{ todo }}</label>
                    </div>
                </ul>
            </div>
        </div>
        <div class="h-16 rounded-b-[15px] bg-slate-300"></div>
    </div>
</template>
