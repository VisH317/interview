<script setup lang="ts">

    const { openDef } = defineProps<{
        openDef: string,
        width: string,
        height: string
    }>()

    const open = useState<boolean>(openDef)
    console.log(openDef, ": ", open)

</script>

<template>
    <div :class="`top-0 left-0 w-screen h-screen bg-[rgba(30,41,59,0.6)] fixed z-50 flex justify-center items-center ${!open ? 'hidden' : ''}`" @click="() => open=false">
        <div :class="`w-[600px] max-w-[${width}] h-[20vh] bg-white rounded-lg overflow-hidden`" @click.stop>
            <slot/>
        </div>
    </div>
</template>