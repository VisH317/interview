<script setup lang="ts">
const props = defineProps<{
    term: string
    def: string
}>()

type rotate = "rotateY(0deg)" | "rotateY(-180deg)"

const r = ref<rotate>("rotateY(0deg)")
const b = ref<rotate>("rotateY(-180deg)")

const flipBack = () => {
    r.value = "rotateY(-180deg)"
    b.value = "rotateY(0deg)"
}

const flipFront = () => {
    r.value = "rotateY(0deg)"
    b.value = "rotateY(-180deg)"
}
</script>

<template>
    <div
        :class="`w-full relative h-full overflow-hidden ${hidden ? 'hidden' : ''}`"
    >
        <div
            class="p-20 rounded-lg w-full h-full overflow-hidden duration-300 border-2 bg-slate-100 absolute top-0 left-0 text-4xl text-slate-800 font-semibold flex justify-center items-center"
            :style="`transform-style: preserve-3d; transform: ${r}; backface-visibility: hidden`"
            @click="flipBack"
        >
            {{ term }}
        </div>
        <div
            class="p-20 rounded-lg w-full h-full overflow-hidden duration-300 border-2 bg-slate-600 absolute top-0 left-0 text-xl text-slate-200 font-normal flex justify-center items-center"
            :style="`transform-style: preserve-3d; transform: ${b}; backface-visibility: hidden`"
            @click="flipFront"
        >
            {{ def }}
        </div>
    </div>
</template>
