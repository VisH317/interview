<script setup lang="ts">
const width = ref<number>(33.333333333)

onMounted(() => {
    if (process.browser && window.innerWidth < 500) {
        width.value = 100
    }
})
</script>

<template>
    <div class="w-full bg-slate-300 p-5 overflow-hidden">
        <div class="flex inner h-full">
            <Testimonial
                img-path="/aized.jpg"
                quote="This looks great, keep going!"
                desc="Aized Sethna, Cofounder & CEO @ Sticky Cards"
            />
            <Testimonial
                img-path="/sachin_bagri.jpg"
                quote="Amazing product and idea!"
                desc="Sachin Bagri, Founder @ Leap Room"
            />
            <Testimonial
                img-path="/matt_mcateer.png"
                quote="Considering how many coding interviews basically come down to memorization, this looks great!"
                desc="Matt McAteer, Machine Learning Lead @ 5cube Labs"
            />
            <Testimonial
                img-path="/tj.jpg"
                quote="Makes alot of sense, I just sit there and read notes but this is way more interesting."
                desc="Tanmay Jain, Founder @ Qwokka.io"
            />
            <Testimonial
                img-path="/aized.jpg"
                quote="This looks great, keep going!"
                desc="Aized Sethna, Cofounder & CEO @ Sticky Cards"
            />
            <Testimonial
                img-path="/sachin_bagri.jpg"
                quote="Amazing product and idea!"
                desc="Sachin Bagri, Founder @ Leap Room"
            />
            <Testimonial
                img-path="/matt_mcateer.png"
                quote="Considering how many coding interviews basically come down to memorization, this looks great!"
                desc="Matt McAteer, Machine Learning Lead @ 5cube Labs"
            />
            <Testimonial
                img-path="/tj.jpg"
                quote="Makes alot of sense, I just sit there and read notes but this is way more interesting."
                desc="Tanmay Jain, Founder @ Qwokka.io"
            />
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
    width: calc(33.333333333% * 8);
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
