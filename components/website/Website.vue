<script setup lang="ts">
interface IOutput {
    url: string
    info: string
}

const open = useState<boolean>("website")

const currentNote = useState<string>("currentNote")
const loading = useState<boolean>("loading")

// const { data: note, refresh } = await useFetch("/api/noteById", {
//     query: { id: currentNote.value as string },
//     watch: [currentNote],
// })
// console.log("note: ", note.value)

// watch(currentNote, () => {
//     console.log("refreshing !!!")
//     refresh().then(() => console.log("new note: ", note.value))
// })

const web = ref<string>("")

const addWebsite = () => {
    // const { data: note, refresh } = await useAsyncData(
    //     `note_${currentNote.value as string}`,
    //     () =>
    //         $fetch("/api/noteById", {
    //             query: { id: currentNote.value as string },
    //         })
    // )
    // loading.value = true
    // if (web.value.length < 4) return
    // const { data: newContent } = await useAsyncData(`website`, () =>
    //     $fetch("http://localhost:8000/scrape", {
    //         method: "POST",
    //         body: {
    //             job_desc: note.value?.desc,
    //             url: web.value,
    //         },
    //     })
    // )

    // console.log("data: ", newContent.value)

    // await $fetch("/api/website", {
    //     method: "POST",
    //     body: {
    //         id: note.value?.id,
    //         content: newContent.value,
    //     },
    // })
    // open.value = false
    // loading.value = false
    // await refresh()
    alert("This feature is currently in development, we'll let you know when it's ready (probably in a couple days)")
    open.value = false
}
</script>

<template>
    <div
        :class="`top-0 left-0 w-screen h-screen bg-[rgba(30,41,59,0.6)] fixed z-50 flex justify-center items-center ${
            !open ? 'hidden' : ''
        }`"
        @click="() => (open = false)"
    >
        <div
            class="max-w-[60%] w-[650px] h-[43%] max-h-[500px] bg-white overflow-hidden gap-4 shadow-lg relative rounded-[15px] overflow-hidden p-5 flex flex-col items-center py-10 pb-20"
            @click.stop
        >
            <div class="flex-none">
                <h1 class="text-4xl text-slate-800 font-bold">
                    <p class="text-center">
                        Add a
                        <span
                            class="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300"
                            >Website</span
                        ><br />to Your Notes
                    </p>
                </h1>
            </div>
            <div class="grow flex flex-col justify-center gap-4 w-[70%]">
                <h2
                    class="font-['Inter',sans-serif] text-sm text-slate-400 font-bold uppercase ml-[5%]"
                >
                    website url
                </h2>
                <div class="bg-slate-200 rounded-[10px] h-16 border-[1px] test">
                    <input
                        v-model="web"
                        type="text"
                        class="py-5 px-5 outline-none rounded-[9px] w-full h-full border-none"
                    />
                </div>
            </div>
            <div class="flex justify-center gap-4">
                <div
                    class="group bg-gradient-to-r w- h-12 justify-center border-slate-400 w-40 border-2 items-center px-8 py-3 hover:-translate-y-1 duration-300 text-slate-400 font-light text-xl cursor-pointer flex gap-4 rounded-[15px]"
                    @click="open = false"
                >
                    Back
                </div>
                <div
                    class="group bg-gradient-to-r w- h-12 justify-center from-pink-300 to-blue-300 w-40 items-center px-8 py-3 hover:-translate-y-1 duration-300 text-white font-light text-xl cursor-pointer flex gap-4 rounded-[15px]"
                    @click="() => void addWebsite()"
                >
                    Add Site
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.test {
    border: double 2px transparent;
    border-radius: 10px;
    background-image: linear-gradient(white, white),
        linear-gradient(to right, #e2e8f0, #e2e8f0);
    background-origin: border-box;
    background-clip: content-box, border-box;
    transition: 0.15s;
    display: hidden;
}

.test:hover {
    border: double 2px transparent;
    background-image: linear-gradient(white, white),
        linear-gradient(to right, #f9a8d4, #93c5fd);
}

.test:focus {
    border: double 2px transparent;
    background-image: linear-gradient(white, white),
        linear-gradient(to right, #f9a8d4, #93c5fd);
}
</style>
