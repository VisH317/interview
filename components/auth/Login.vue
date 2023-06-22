<script setup>

</script>

<template>
    <Modal openDef="login-modal">
        <div class="w-full h-full flex justify-center">
            <div class="w-[40%] h-full bg-slate-700 p-5">
                Hello
            </div>
            <div class="w-[60%] flex flex-col items-center justify-center gap-4">
                <h3 class="text-6xl font-bold text-slate-800">Sign In</h3>
                <div class="h-12"/>
                <div class="transition-all duration-300 p-[2px] rounded-lg bg-gradient-to-br from-blue-300 to-pink-300 w-[70%]">
                    <input type="text" class="w-full p-5 rounded-md outline-none text-lg" placeholder="Email: "/>
                </div>
                <div class="h-6"/>
                <div class="transition-all duration-300 p-[2px] rounded-lg bg-gradient-to-br from-blue-300 to-pink-300 w-[70%]">
                    <input type="password" class="w-full p-5 rounded-md outline-none text-lg" placeholder="Password: "/>
                </div>
                <div class="relative inline-flex items-center justify-center w-full">
                    <hr class="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
                    <span class="absolute px-3 font-medium text-gray-900 bg-white mx-auto dark:text-gray-900">Let's Go</span>
                </div>

                
            </div>
        </div>
    </Modal>
</template>