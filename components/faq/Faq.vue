<script setup lang="ts">
type FAQ = { title: string, desc: string }

const faqs: FAQ[] = [
    {
        title: "Faq 1",
        desc: "Donec sed ipsum vel nunc ornare auctor non eget dui. Ut eget dolor at erat faucibus pellentesque vitae et tortor. Etiam dapibus neque eget semper convallis. Cras vel cursus arcu, et molestie lorem. Aenean id leo congue, hendrerit erat et, elementum massa. Etiam velit urna, interdum a sollicitudin ac, maximus eu dolor. Integer vel semper libero. Maecenas sed justo non orci auctor pulvinar nec non ante. Suspendisse sit amet sagittis tellus, vel tempor sapien."
    },
    {
        title: "Faq 2",
        desc: "Suspendisse mattis nunc et euismod vestibulum. Duis posuere nisi vulputate luctus ultricies. Curabitur facilisis aliquet nulla vel mollis. Aenean nec eros vitae odio fermentum bibendum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec congue tristique risus, at luctus purus tristique sit amet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque varius tellus sapien, "
    },
    {
        title: "Faq 3",
        desc: "Phasellus at venenatis ex. Cras orci tortor, euismod scelerisque imperdiet at, gravida sit amet nisl. Proin sed accumsan diam, nec imperdiet erat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus nec aliquet nibh. Donec vel ante nisi. Praesent hendrerit, dolor vitae auctor volutpat, enim ante rutrum mauris, eu maximus urna ante in enim. Etiam nec mauris velit. Mauris id ex aliquet, sagittis sem sit amet, pulvinar nunc. Vivamus efficitur, "
    },
]
</script>

<template>
    <div class="w-full bg-white min-[500px]:p-20 max-[500px]:py-20 max-[500px]:px-5 min-[500px]:pl-48 flex flex-col gap-16">
        <p class="text-5xl font-bold text-slate-800 max-[500px]:text-center">Frequently Asked Questions</p>
        <div class="flex flex-col">
            <FaqItem v-for="faq in faqs" :title="faq.title" :desc="faq.desc"/>
        </div>
    </div>
</template>