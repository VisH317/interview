<script setup lang="ts">
useHead({
    title: "Dashboard - InterviewSense",
})

const router = useRouter()
const user = useSupabaseUser()

onMounted(() => {
    if (!user.value) router.push("/")
})

const { data: upgraded } = await useFetch("/api/user", {
    query: { id: user.value?.id }
})

// note getting
const { data: notes, refresh } = await useFetch("/api/note", {
    query: { id: user.value?.id },
})

// note creation
const open = useState<boolean>("createNoteModal", () => false)
const title = ref<string>("")
const desc = ref<string>("")
const disabled = ref<boolean>(true)

// global loading
const loading = useState<boolean>("loading", () => false)

watch([title, desc], () => {
    if (title.value.length !== 0 && desc.value.length !== 0)
        disabled.value = false
    else disabled.value = true
})

const createNote = async (title: string, desc: string) => {
    // create summary and to do list

    // const { data: description } = await useAsyncData(`desc_${desc}`, () =>
    //     $fetch("/api/desc", { method: "POST", body: { desc: desc.value } })
    // )
    console.log("HOLA COMO ESTA")
    const { data: todo } = await useAsyncData(`todo_${desc}`, () =>
        $fetch("/api/todo", { method: "POST", body: { desc } })
    )

    const content = `<h1></h1>`

    console.log("FETCHING :)")

    await $fetch("/api/note", {
        method: "POST",
        body: {
            userid: user.value?.id,
            title,
            content,
            todo: todo.value,
        },
    })

    console.log("CREATED :)")

    await refresh()
    open.value = false
}

useState<string | null>("currentNote", () => null)

// initialize current note vars
useState<boolean>("flashcard", () => false)
useState<boolean>("quiz", () => false)
useState<boolean>("website", () => false)

// note deletion
const deleteOpen = useState<boolean>("deleteNoteModal", () => false)
const deleteIndex = useState<number>("deleteNoteIndex", () => -1)

const deleteNote = async () => {
    await $fetch("/api/note", {
        method: "DELETE",
        query: { id: notes.value![deleteIndex.value].id },
    })
    await refresh()
    deleteOpen.value = false
}
</script>

<template>
    <div class="font-['Inter',sans-serif]">
        <div
            class="relative w-screen min-h-screen overflow-x-hidden flex flex-row"
        >
            <div
                :class="`fixed top-0 left-0 w-screen min-h-screen z-[10000] flex justify-center items-center text-5xl font-bold bg-[rgba(15,23,42,0.7)] ${
                    loading ? '' : 'hidden'
                }`"
            >
                <p
                    class="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300"
                >
                    LOADING...
                </p>
            </div>
            <Sidebar />
            <div
                class="bg-white h-screen grow overflow-x-hidden overflow-y-auto"
            >
                <Main
                    @create-note="(title: string, desc: string) => void createNote(title, desc)"
                />
            </div>
        </div>

        <!-- create modal -->

        <DashModal width="15%" height="25vh" open-def="createNoteModal">
            <div class="p-10 flex flex-col gap-10 items-center justify-center">
                <h1 class="text-slate-800 font-semibold text-4xl">
                    Let's Get
                    <span
                        class="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300"
                        >Started</span
                    >
                </h1>
                <div class="flex justify-center items-center w-full gap-3">
                    <div
                        class="flex flex-col items-center justify-center w-[60%] p-5 gap-5"
                    >
                        <input
                            v-model="title"
                            type="text"
                            class="w-full p-4 outline-none hover:border-slate-400 focus:border-slate-400 duration-300 border-2 border-slate-300 rounded-lg text-xl h-14"
                            placeholder="Title: "
                        />
                        <textarea
                            v-model="desc"
                            type="text"
                            class="w-full p-4 outline-none hover:border-slate-400 focus:border-slate-400 duration-300 border-2 border-slate-300 rounded-lg text-xl h-40"
                            placeholder="Paste in the job description of the job you're applying to here: "
                        />
                    </div>
                    <div
                        v-if="!upgraded && notes.length>=2"
                        :class="`group relative flex flex-row items-center transition ease-in-out duration-300 ${
                            disabled
                                ? ''
                                : 'hover:-translate-y-1 hover:opacity-[0.85]'
                        } w-40 h-24`"
                        @click="() => void createNote(title, desc)"
                    >
                        <div
                            :class="` ${
                                true
                                    ? 'bg-slate-300 cursor-default'
                                    : 'group-hover:shadow-lg bg-slate-800 cursor-pointer'
                            } text-white duration-300 transition ease-in-out text-2xl font-light rounded-lg h-14 w-32 text-center flex justify-center items-center z-20 absolute left-4 top-5`"
                            v-tippy="'Upgrade to create more notes'"
                        >
                            Create
                        </div>
                    </div>
                    <div
                        v-else
                        :class="`group relative flex flex-row items-center transition ease-in-out duration-300 ${
                            disabled
                                ? ''
                                : 'hover:-translate-y-1 hover:opacity-[0.85]'
                        } w-40 h-24`"
                        @click="() => void createNote(title, desc)"
                    >
                        <button
                            v-if="!disabled"
                            :disabled="disabled"
                            class="bg-gradient-to-br from-blue-300 to-pink-300 py-2 px-4 flex justify-center items-center blur-xl w-40 h-full absolute"
                        ></button>
                        <div
                            :class="` ${
                                disabled
                                    ? 'bg-slate-300 cursor-default'
                                    : 'group-hover:shadow-lg bg-slate-800 cursor-pointer'
                            } text-white duration-300 transition ease-in-out text-2xl font-light rounded-lg h-14 w-32 text-center flex justify-center items-center z-20 absolute left-4 top-5`"
                        >
                            Create
                        </div>
                    </div>
                </div>
            </div>
        </DashModal>

        <!-- delete modal -->

        <DashModal width="15%" height="25vh" open-def="deleteNoteModal">
            <div class="p-10 flex flex-col gap-10 items-center justify-center">
                <h1 class="text-slate-800 font-semibold text-4xl text-center">
                    Are you sure you want to delete
                    {{ deleteIndex > -1 ? notes![deleteIndex].title : "" }}?
                </h1>
                <div
                    class="flex justify-center items-center w-full items-center gap-3"
                >
                    <div
                        :class="`group relative flex flex-row items-center transition ease-in-out duration-300 hover:-translate-y-1 hover:opacity-[0.85] w-40 h-24`"
                        @click="() => (deleteOpen = false)"
                    >
                        <button
                            :class="`text-slate-400 border-2 border-slate-400 duration-300 font-semibold transition ease-in-out text-2xl font-light rounded-lg h-14 w-32 text-center flex justify-center items-center z-20 absolute left-4 top-5`"
                        >
                            No
                        </button>
                    </div>
                    <div
                        :class="`group relative flex flex-row items-center transition ease-in-out duration-300 hover:-translate-y-1 hover:opacity-[0.85] w-40 h-24`"
                        @click="() => void deleteNote()"
                    >
                        <button
                            :class="` text-white duration-300 bg-red-500  transition ease-in-out text-2xl font-light rounded-lg h-14 w-32 text-center flex justify-center items-center z-20 absolute left-4 top-5`"
                        >
                            Yes
                        </button>
                    </div>
                </div>
            </div>
        </DashModal>
    </div>
</template>
