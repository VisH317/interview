<script setup lang="ts">
    import { generateJSON } from '@tiptap/vue-3';

    useHead({
        title: "Dashboard - InterviewSense"
    })

    const router = useRouter()
    const user = useSupabaseUser()
    const supabase = useSupabaseClient()

    const logout = () => {
        supabase.auth.signOut()
        router.push("/")
    }

    onMounted(() => { if(!user.value) router.push("/") })

    // note getting
    const { data: notes, refresh } = await useFetch("/api/note", { query: { id: user.value?.id } })


    // note creation
    const open = useState<boolean>("createNoteModal", () => false)
    const title = ref<string>("")
    const desc = ref<string>("")
    const disabled = ref<boolean>(true)

    watch(title, () => {
        if(title.value.length!==0 && desc.value.length!==0) disabled.value = false
        else disabled.value = true
    })

    const createNote = async () => {

        // create summary and to do list

        const { data: description } = await useAsyncData(`desc_${desc}`, () => $fetch("/api/desc", { method: "POST", body: { desc } }))
        const { data: todo } = await useAsyncData(`todo_${desc}`, () => $fetch("/api/todo", { method: "POST", body: { desc } }))

        

        await $fetch('/api/note', { 
            method: "POST",
            body: {
                userid: user.value?.id,
                title: title.value
            }
        })
        refresh()
        open.value = false
    }    

    const currentNote = useState<string | null>("currentNote", () => null)

    // note deletion
    const deleteOpen = useState<boolean>("deleteNoteModal", () => false)
    const deleteIndex = ref<number>(-1)

    const setDelete = (idx: number) => {
        console.log("asfjaoeifj")
        deleteIndex.value = idx
        deleteOpen.value = true
    }

    const deleteNote = async () => {
        await $fetch('/api/note', {
            method: "DELETE",
            query: { id: notes.value![deleteIndex.value].id }
        })
        refresh()
        deleteOpen.value = false
    }

</script>

<template>
    <div class="w-screen min-h-screen overflow-x-hidden flex flex-row">
        <div class="flex-none bg-slate-100 h-screen w-[260px] overflow-x-hidden overflow-y-auto flex flex-col">
            <div class="flex-none flex flex-row gap-3 items-center w-full cursor-pointer p-5">
                <nuxt-img src="/logo.png" height="40px" width="40px"/>
                <p class="text-slate-800 font-semibold text-2xl">Interview<span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300">Sense</span></p>
            </div>
            <!-- <p class="flex-none text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300 font-medium text-xl text-center">{{ user?.email?.split("@")[0] }}'s Notes</p> -->
            <div class="h-4"/>
            <div class="w-full">
                <div class="w-full p-5 hover:bg-slate-300 duration-300 text-slate-400 font-normal text-xl cursor-pointer flex gap-4"><div class="inline"><font-awesome-icon icon="fa-solid fa-cog"/></div> Settings</div>
                <div class="w-full p-5 hover:bg-slate-300 duration-300 text-slate-400 font-normal text-xl cursor-pointer flex gap-4"><div class="inline"><font-awesome-icon icon="fa-solid fa-user"/></div> Account</div>
            </div>
            <div class="flex-none h-4"/>
            <div class="grow overflow-y-hidden flex flex-col">
                <div class="p-5 flex-none">
                    <p class="text-slate-400 font-semibold text-md">YOUR NOTE PAGES</p>
                </div>
                <div class="overflow-y-auto grow">
                    <NavItem v-for="(note, index) in notes" :title="note.title" :id="index" @delete="() => setDelete(index)" :uuid="note.id"/>
                </div>
            </div>
            <div class="flex-none py-10">
                <hr class="h-[2px] w-[90%] mx-auto bg-gray-200 border-0 dark:bg-slate-400 rounded-lg"/>
                <div class="h-4"/>
                <div class="group w-full p-5 hover:bg-slate-300 duration-300 text-slate-400 font-normal text-xl cursor-pointer flex gap-4" @click="() => open=true"><div class="inline"><font-awesome-icon icon="fa-solid fa-plus" class="group-hover:rotate-[360deg] duration-300"/></div> Create Note</div>
                <div class="group w-full p-5 hover:bg-slate-300 duration-300 text-slate-400 font-normal text-xl cursor-pointer flex gap-4" @click="logout"><div class="inline"><font-awesome-icon icon="fa-solid fa-sign-out" class="group-hover:translate-x-1 duration-300"/></div> Logout</div>
            </div>
            <div class="flex-none h-8"/>
        </div>
        <div class="bg-white h-screen grow overflow-x-hidden overflow-y-auto">
            <Main />
        </div>
    </div>
    <DashModal width="15%" height="25vh" openDef="createNoteModal">
        <div class="p-10 flex flex-col gap-10 items-center justify-center">
            <h1 class="text-slate-800 font-semibold text-4xl">Let's Get <span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300">Started</span></h1>
            <div class="flex justify-center w-full gap-3">
                <div class="flex flex-col items-center w-[60%] p-5 gap-5">
                    <input type="text" class="w-full p-4 outline-none hover:border-slate-400 focus:border-slate-400 duration-300 border-2 border-slate-300 rounded-lg text-xl h-14" placeholder="Title: " v-model="title"/>
                    <textarea type="text" class="w-full p-4 outline-none hover:border-slate-400 focus:border-slate-400 duration-300 border-2 border-slate-300 rounded-lg text-xl h-40" placeholder="Paste in the job description of the job you're applying to here: " v-model="desc"/>
                </div>
                <div :class="`group relative flex flex-row items-center transition ease-in-out duration-300 ${disabled ? '' : 'hover:-translate-y-1 hover:opacity-[0.85]'} w-40 h-24`" @click="() => void createNote()">
                    <button :disabled="disabled" class="bg-gradient-to-br from-blue-300 to-pink-300 py-2 px-4 flex justify-center items-center blur-xl w-40 h-full absolute" v-if="!disabled"></button>
                    <div :class="` ${disabled ? 'bg-slate-300 cursor-default' : 'group-hover:shadow-lg bg-slate-800 cursor-pointer'} text-white duration-300 transition ease-in-out text-2xl font-light rounded-lg h-14 w-32 text-center flex justify-center items-center z-20 absolute left-4 top-5`">Create</div>
                </div>
            </div>
        </div>
    </DashModal>
    <DashModal width="15%" height="25vh" openDef="deleteNoteModal">
        <div class="p-10 flex flex-col gap-10 items-center justify-center">
            <h1 class="text-slate-800 font-semibold text-4xl text-center">Are you sure you want to delete {{ deleteIndex>-1 ? notes![deleteIndex].title : "" }}?</h1>
            <div class="flex justify-center items-center w-full items-center gap-3"> 
                <div :class="`group relative flex flex-row items-center transition ease-in-out duration-300 hover:-translate-y-1 hover:opacity-[0.85] w-40 h-24`" @click="() => deleteOpen=false">
                    <button :class="`text-slate-400 border-2 border-slate-400 duration-300 font-semibold transition ease-in-out text-2xl font-light rounded-lg h-14 w-32 text-center flex justify-center items-center z-20 absolute left-4 top-5`">No</button>
                </div>
                <div :class="`group relative flex flex-row items-center transition ease-in-out duration-300 hover:-translate-y-1 hover:opacity-[0.85] w-40 h-24`" @click="() => void deleteNote()">
                    <button :class="` text-white duration-300 bg-red-500  transition ease-in-out text-2xl font-light rounded-lg h-14 w-32 text-center flex justify-center items-center z-20 absolute left-4 top-5`">Yes</button>
                </div>
            </div>
        </div>
    </DashModal>
</template>