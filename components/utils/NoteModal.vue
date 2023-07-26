<script setup lang="ts">
const { openDef } = defineProps<{
    openDef: string
}>()

const open = useState<boolean>(openDef)
</script>

<template>
    <div
        :class="`top-0 left-0 w-screen h-screen bg-[rgba(30,41,59,0.6)] fixed z-50 flex justify-center items-center ${
            !open ? 'hidden' : ''
        }`"
        @click="() => (open = false)"
    >
        <div
            class="w-[80%] max-w-[1670px] h-3/4 bg-white overflow-hidden shadow-lg relative rounded-[15px] overflow-hidden"
            @click.stop
        >
            <slot />
        </div>
    </div>
</template>
