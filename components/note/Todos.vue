<script setup lang="ts">
const currentNote = useState<string>("currentNote")

const {
    data: note,
    pending,
    error,
} = await useFetch("/api/noteById", {
    query: { id: currentNote.value as string },
})

const todos = ref<boolean[]>(note.value?.todo.map(() => false) as boolean[])
</script>

<template>
    <div
        class="fixed -top-[500px] right-10 min-w-[25%] w-[450px] hover:top-0 duration-300 z-50"
    >
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
                <ul
                    v-if="!error && !pending"
                    class="p-5 grow overflow-y-auto flex flex-col gap-5"
                >
                    <div
                        v-for="(todo, ix) in note?.todo"
                        :key="todo"
                        class="flex gap-3 relative"
                    >
                        <div class="relative">
                            <input
                                :id="todo"
                                v-model="todos[ix]"
                                type="checkbox"
                                className="
                                peer shrink-0
                                appearance-none w-[20px] h-[20px] border-2 border-slate-200 rounded-sm bg-white
                                checked:bg-slate-400 checked:border-0"
                            />
                            <div
                                class="hidden peer-checked:block absolute w-[15px] h-[15px] ml-[2.5px] mt-[2.5px] z-50 top-0 left-0 pointer-events-none"
                            >
                                <svg
                                    className="w-full h-full mt-1 pointer-events-none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="white"
                                    stroke-width="4"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <polyline
                                        points="20 6 9 17 4 12"
                                    ></polyline>
                                </svg>
                                <!-- <p class="text-4xl">HOLA</p> -->
                            </div>
                        </div>
                        <label :for="todo" class="text-slate-500 font-light">{{
                            todo
                        }}</label>
                    </div>
                </ul>
                <ul
                    v-else-if="pending"
                    class="p-5 grow overflow-y-auto flex flex-col gap-5 w-[420px]"
                >
                    <skeleton-loader class="w-full h-8" />
                    <skeleton-loader class="w-full h-8" />
                    <skeleton-loader class="w-full h-8" />
                    <skeleton-loader class="w-full h-8" />
                </ul>
                <div v-else class="w-full">
                    <div class="h-8" />
                    <p class="font-light text-2xl text-slate-500">
                        An error has occurred :(, please try again
                    </p>
                </div>
            </div>
        </div>
        <div class="h-16 rounded-b-[15px] bg-slate-300"></div>
    </div>
</template>
