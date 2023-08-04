<script setup lang="ts">

</script>

<template>
    <div class="w-full bg-slate-300 h-80 p-5 overflow-hidden">
        <div class="flex inner h-full" :style="`width: ${33.333333333*8}%`">
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