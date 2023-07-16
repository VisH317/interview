<script setup lang="ts">
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const router = useRouter()

const { data: notes } = await useFetch("/api/note", {
    query: { id: user.value?.id },
})

// note creation
const open = useState<boolean>("createNoteModal", () => false)
const title = ref<string>("")
const desc = ref<string>("")
const disabled = ref<boolean>(true)

watch([title, desc], () => {
    if (title.value.length !== 0 && desc.value.length !== 0)
        disabled.value = false
    else disabled.value = true
})

const deleteOpen = useState<boolean>("deleteNoteModal")
const deleteIndex = useState<number>("deleteNoteIndex")

const setDelete = (idx: number) => {
    deleteIndex.value = idx
    deleteOpen.value = true
}

const logout = async () => {
    supabase.auth.signOut()
    await router.push("/")
}
</script>

<template>
    <div
        class="flex-none bg-slate-200 h-screen w-[280px] overflow-x-hidden overflow-y-auto flex flex-col font-['Inter',sans-serif]"
    >
        <div
            class="flex-none flex flex-row gap-3 items-center w-full cursor-pointer p-5"
        >
            <nuxt-img src="/logo.png" height="40px" width="40px" />
            <p class="text-slate-800 font-semibold text-2xl">
                Interview<span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300"
                    >Sense</span
                >
            </p>
        </div>
        <div class="h-4" />
        <div class="w-full"></div>
        <div class="flex-none h-4" />
        <div class="grow overflow-y-hidden flex flex-col">
            <div>
                <h2
                    class="font-['Inter',sans-serif] text-sm text-slate-400 font-bold uppercase px-[8%]"
                >
                    Notes
                </h2>
            </div>
            <div class="h-4" />
            <div class="overflow-y-auto grow py-1 px-5">
                <NavItem
                    v-for="(note, index) in notes"
                    :id="index"
                    :key="index"
                    :uuid="note.id"
                    :title="note.title"
                    @delete="() => setDelete(index)"
                />
            </div>
        </div>
        <div class="flex-none py-10">
            <h2
                class="font-['Inter',sans-serif] text-sm text-slate-400 font-bold uppercase px-[8%]"
            >
                Actions
            </h2>
            <div class="h-4" />
            <div class="w-full flex flex-col py-1 px-5 gap-2">
                <SidebarItem
                    icon="plus"
                    text="Create Note"
                    anim="rotate-0 group-hover:rotate-[360deg]"
                    @select="() => (open = true)"
                />
                <SidebarItem icon="sign-out" text="Logout" @select="logout" />
                <div
                    class="group w-full bg-gradient-to-br from-pink-300 to-blue-300 items-center p-5 hover:-translate-y-1 duration-300 text-white font-medium text-xl cursor-pointer flex gap-4 rounded-[20px]"
                    @click="() => console.log('upgrade :)')"
                >
                    <div class="inline">
                        <font-awesome-icon :icon="`fa-solid fa-angle-double-up`" :class="`text-2xl font-bold ${anim}`" />
                    </div>
                    <div>Upgrade</div>
                </div>
            </div>
        </div>
        <div class="flex-none h-8" />
    </div>
</template>
