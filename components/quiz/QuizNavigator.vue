<script setup lang="ts">
type OEState = {
    type: "oe"
    content: string
}

type MCState = {
    type: "mc"
    content: number
}

defineProps<{
    active: number
    formStates: (OEState | MCState)[]
}>()

</script>

<template>
    <div
        class="w-[30%] rounded-[15px] bg-slate-600 h-full p-5 flex flex-col justify-center items-center pt-[10%] pb-[5%]"
    >
        <div class="flex-none">
            <p
                class="text-5xl font-medium text-transparent bg-clip-text bg-gradient-to-r h-16 from-pink-300 to-blue-300"
            >
                Progress
            </p>
        </div>
        <div class="flex-none h-10"/>
        <div class="grow flex flex-wrap gap-4 w-[80%] justify-start">
            <div
                v-for="(state, ix) in formStates"
                :key="ix"
                :class="` border-2 rounded-[50%] flex justify-center items-center aspect-square cursor-pointer ${
                    ix === active
                        ? 'text-white bg-gradient-to-r bg-no-repeat from-pink-300 to-blue-300 border-none'
                        : (typeof state.content === 'number' &&
                              state.content === -1) ||
                          (typeof state.content === 'string' &&
                              state.content === '')
                        ? 'bg-transparent border-slate-500 text-slate-300'
                        : 'bg-slate-500 border-slate-500 text-slate-300'
                } w-10 h-10`"
            >
                {{ ix+1 }}
            </div>
        </div>
        <div class="flex-none flex w-[80%] flex-col gap-3">
            <div class="flex gap-3 justify-between">
                <div
                    class="group bg-slate-500 w-1/2 justify-center items-center px-8 py-2 h-14 hover:-translate-y-1 duration-300 text-slate-400 font-light text-xl cursor-pointer flex gap-4 rounded-[15px]"
                    @click="() => { quizModal=false }"
                >
                    <font-awesome-icon icon="fa-solid fa-caret-left" class="text-white text-4xl"/>
                </div>
                <div
                    class="group bg-slate-500 w-1/2 justify-center items-center px-8 py-2 h-14 hover:-translate-y-1 duration-300 text-slate-400 font-light text-xl cursor-pointer flex gap-4 rounded-[15px]"
                    @click="() => { quizModal=false }"
                >
                    <font-awesome-icon icon="fa-solid fa-caret-right" class="text-white text-4xl"/>
                </div>
            </div>
            <div
                class="group bg-gradient-to-r w-full justify-center from-pink-300 h-14 to-blue-300 items-center px-8 py-3 hover:-translate-y-1 duration-300 text-white font-light text-xl cursor-pointer flex gap-4 rounded-[15px]"
                @click="() => void createQuiz()"
            >
                Submit
            </div>
        </div>
    </div>
</template>
