<script setup lang="ts">
type MCState = {
    type: "mc"
    question: string
    content: number
}

const output = ref<number>(-1)

watch(output, () => {
    emit("change", output.value)
})

const props = defineProps<{
    question: MCState
    index: number
}>()
const emit = defineEmits<{
    (e: "change", output: number): void
}>()
</script>

<template>
    <div class="w-full h-full p-10 flex flex-col gap-5">
        <div class="flex-none">
            <p class="text-5xl font-bold text-slate-800">
                Question: {{ index }}
            </p>
        </div>
        <div class="flex-none h-6" />
        <div class="flex-none">
            <p>{{ question.question }}</p>
            <p class="font-medium text-slate-400 text-xl">
                {{ question.question.split(";")[1].split(":")[1] }}
            </p>
        </div>
        <div class="flex-none h-4" />
        <div
            class="flex-none h-px w-[100%] bg-gradient-to-r from-pink-300 to-blue-300"
        ></div>
        <div class="flex-none h-2" />
        <div class="grow w-full flex justify-center">
            <div class="w-[90%] h-full flex flex-col justify-center gap-5">
                <div
                    v-for="(ans, ix) in question.question
                        .split(';')[2]
                        .split(':')[1]
                        .split(', ')"
                    :key="ans"
                    class="flex items-center mb-4"
                >
                    <input
                        v-model="output"
                        :id="ans"
                        type="radio"
                        :value="ix"
                        class="w-5 h-5 appearance-none rounded-[50%] text-blue-600 bg-gradient-to-br from-slate-100 to-slate-100 border-white border-2 checked:from-pink-300 checked:to-blue-300 focus:ring-slate-200 focus:ring-2"
                    />
                    <label
                        :for="ans"
                        class="ml-5 text-2xl font-medium text-slate-500"
                        >{{ ans }}</label
                    >
                </div>
            </div>
        </div>
    </div>
</template>
