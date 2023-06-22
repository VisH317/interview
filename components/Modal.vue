<script setup lang="ts">

    const login = useState('login-modal', () => false)

</script>

<template>
    <div :class="`top-0 left-0 w-screen h-screen bg-[rgba(30,41,59,0.6)] fixed z-50 flex justify-center items-center ${!login ? 'hidden' : ''}`" @click="() => login=false">
        <div class="w-[50%] max-w-[1400px] h-2/3 bg-white rounded-lg p-5" @click.stop="">
            HALLOBRUH
        </div>
    </div>
</template>