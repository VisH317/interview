<script setup lang="ts">
const width = ref<number>(33.333333333)

onMounted(() => {
    if(process.browser && window.innerWidth<500) {
        width.value = 100
    }
})
</script>

<template>
    <div class="w-full bg-slate-300 h-80 p-5 overflow-hidden">
        <div class="flex inner h-full">
            <Testimonial imgPath="/aized.jpg" quote="Very good product with amazing experience! Can't wait to use!" desc="Aized Sethna, Cofounder & CEO @ Sticky Cards" />
            <Testimonial imgPath="/dhruv.jpg" quote="Amazing experience using and would definitely recommend!" desc="Dhruv Kulkarni, Cofounder @ AI Entrepreneurs at Berkeley" />
            <Testimonial imgPath="/aized.jpg" quote="Very good product with amazing experience! Can't wait to use!" desc="Aized Sethna, Cofounder & CEO @ Sticky Cards" />
            <Testimonial imgPath="/dhruv.jpg" quote="Amazing experience using and would definitely recommend!" desc="Dhruv Kulkarni, Cofounder @ AI Entrepreneurs at Berkeley" />
            <Testimonial imgPath="/aized.jpg" quote="Very good product with amazing experience! Can't wait to use!" desc="Aized Sethna, Cofounder & CEO @ Sticky Cards" />
            <Testimonial imgPath="/dhruv.jpg" quote="Amazing experience using and would definitely recommend!" desc="Dhruv Kulkarni, Cofounder @ AI Entrepreneurs at Berkeley" />
            <Testimonial imgPath="/aized.jpg" quote="Very good product with amazing experience! Can't wait to use!" desc="Aized Sethna, Cofounder & CEO @ Sticky Cards" />
            <Testimonial imgPath="/dhruv.jpg" quote="Amazing experience using and would definitely recommend!" desc="Dhruv Kulkarni, Cofounder @ AI Entrepreneurs at Berkeley" />
        </div>
    </div>
</template>

<style scoped>
.inner {
    display: flex;
    width: fit-content;
    animation-name: loop;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: normal;
    animation-duration: 14000ms;
    width: calc(33.333333333%*8);
}

@media only screen and (max-width: 500px) {
    .inner {
        width: 800%;
        animation-duration: 20000ms;
    }
}

@keyframes loop {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>