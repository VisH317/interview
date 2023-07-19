<script setup lang="ts">
type Home = { type: "home" }
type InProgress = {
    type: "quiz"
    activeQuizId: string
}
type Graded = {
    type: "graded"
    activeQuizId: string
}

const quizState = useState<Home | InProgress | Graded>("quizState")
const active = ref<number>(0)

const { data: quiz } = await useFetch("/api/quizById", {
    query: { id: quizState.value.activeQuizId },
})
</script>

<template>
    <div class="w-full h-full flex p-5">
        <div class="w-[70%]">
            <div class="w-full h-full p-10 flex flex-col gap-5">
                <div class="flex-none">
                    <p class="text-5xl font-bold text-slate-800">
                        Question {{ active + 1 }}
                    </p>
                </div>
                <div class="flex-none h-6" />
                <div class="flex-none">
                    <p class="font-medium text-slate-400 text-xl">
                        {{ quiz.questions[active].split(";")[1].split(":")[1] }}
                    </p>
                </div>
                <div class="flex-none h-4" />
                <!-- <div
                    class="flex-none h-px w-[100%] bg-gradient-to-r from-pink-300 to-blue-300"
                ></div> -->
                <div
                    v-if="
                        quiz.questions[active]
                            .split(';')[0]
                            .split(':')[1]
                            .includes('open')
                    "
                >
                    <div class="w-[90%] flex justify-center gap-5">
                        <button
                            class="group bg-gradient-to-r w-40 disabled:bg-slate-500 justify-center from-pink-300 h-14 to-blue-300 items-center px-8 py-3 enabled:hover:-translate-y-1 duration-300 text-white font-light text-2xl cursor-pointer flex gap-4 rounded-[15px]"
                        >
                            Back
                        </button>
                    </div>
                </div>
                <div v-else>multiple</div>
                <!-- <div class="flex-none h-2" /> -->
                <!-- <div
                    v-if="formStates[active].type === 'oe'"
                    class="grow w-full flex justify-center"
                >
                    <textarea
                        class="w-[90%] h-full outline-none outline-transparent border-0 appearance-none"
                        style="resize: none"
                        placeholder="Your Answer Here..."
                        v-model="formStates[active].content"
                    />
                </div>
                <div
                    v-if="formStates[active].type === 'mc'"
                    class="grow w-full flex justify-center"
                >
                    <div
                        class="w-[90%] h-full flex flex-col justify-center gap-5"
                    >
                        <div
                            v-for="(ans, ix) in formStates[active].question
                                .split(';')[2]
                                .split(':')[1]
                                .split(', ')"
                            :key="ans"
                            class="flex items-center mb-4"
                        >
                            <input
                                v-model="formStates[active].content"
                                :id="ans"
                                type="radio"
                                :value="ix"
                                class="w-5 h-5 appearance-none rounded-[50%] text-blue-600 bg-gradient-to-br from-slate-100 to-slate-100 border-white border-2 checked:from-pink-300 checked:to-blue-300 focus:ring-slate-200 focus:ring-2"
                            />
                            <label
                                :for="ans"
                                class="ml-5 text-2xl font-medium text-slate-500"
                                >{{ ans }}</label
                            >
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
        <GradedNavigator
            :active="active"
            :quiz="quiz"
            @active-change="
                (ix) =>
                    (active =
                        ix < 0
                            ? quiz.questions.length - 1
                            : ix >= quiz.questions.length
                            ? 0
                            : ix)
            "
        />
    </div>
</template>
