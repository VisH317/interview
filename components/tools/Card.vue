<script setup lang="ts">
const props = defineProps<{}>()

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
        :class="`w-1/2 aspect-video overflow-hidden ${hidden ? 'hidden' : ''}`"
    >
        <div
            class="p-20 rounded-lg w-full aspect-square overflow-hidden duration-300"
            :style="`transform-style: preserve-3d; transform: ${r}; backface-visibility: hidden`"
            @click="flipFront"
        >
            test
        </div>
        <div
            class="bg-slate-600 h-full p-5 rounded-lg w-full aspect-square duration-300 relative -top-full flex flex-col justify-center items-center"
            :style="`transform-style: preserve-3d; transform: ${b}; backface-visibility: hidden`"
            @click="flipBack"
        >
            test
        </div>
    </div>
</template>
