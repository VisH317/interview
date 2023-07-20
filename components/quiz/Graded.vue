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

const oeState = ref<boolean>(false)

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
                        Review: Question {{ active + 1 }}
                    </p>
                </div>
                <div class="flex-none h-6" />
                <div class="flex-none">
                    <p class="font-medium text-slate-400 text-xl">
                        {{
                            quiz?.questions[active].split(";")[1].split(":")[1]
                        }}
                    </p>
                </div>
                <div class="flex-none h-4" />
                <div
                    class="flex-none h-px w-[100%] bg-gradient-to-r from-pink-300 to-blue-300"
                />
                <div
                    v-if="
                        quiz?.questions[active]
                            .split(';')[0]
                            .split(':')[1]
                            .includes('open')
                    "
                >
                    <div class="grow w-[100%] flex flex-col items-center gap-5">
                        <button
                            class="group bg-gradient-to-r w-50 disabled:bg-slate-500 justify-center from-pink-300 h-14 to-blue-300 items-center px-8 py-3 enabled:hover:-translate-y-1 duration-300 text-white font-light text-2xl cursor-pointer flex gap-4 rounded-[15px]"
                            @click="oeState = !oeState"
                        >
                            {{
                                oeState ? "See Your Answer" : "See Explanation"
                            }}
                        </button>
                        <div class="h-4" />
                        <div class="w-[90%] flex flex-col gap-10">
                            <div class="text-4xl font-semibold text-slate-800">
                                {{
                                    oeState ? "Explanation: " : "Your Answer: "
                                }}
                            </div>
                            <div class="w-full text-xl text-slate-500">
                                {{
                                    oeState
                                        ? quiz?.answers[active]
                                        : quiz?.responses[active]
                                }}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    v-else
                    class="w-[90%] p-[5%] grow h-full w-full flex flex-col justify-center"
                >
                    <div
                        v-for="(ans, ix) in quiz?.questions[active]
                            .split(';')[2]
                            .split(':')[1]
                            .split(', ')"
                        :key="ans"
                        class="flex items-center mb-4"
                    >
                        <input
                            :id="ans"
                            :readonly="true"
                            :disabled="true"
                            :checked="ix === Number(quiz?.answers[active]) || ix === Number(quiz?.responses[active])"
                            type="radio"
                            :class="`w-5 h-5 appearance-none rounded-[50%] text-blue-600 bg-gradient-to-br border-white border-2 focus:ring-slate-200 focus:ring-2 ${ix === Number(quiz?.answers[active]) ? 'from-green-500 to-green-500' : ix === Number(quiz?.responses[active]) ? 'from-red-500 to-green-500' : 'from-slate-200 to-slate-200'}`"
                        />
                        <label
                            :for="ans"
                            class="ml-5 text-2xl font-medium text-slate-500"
                            >{{ ans }}</label
                        >
                    </div>
                </div>
            </div>
        </div>
        <GradedNavigator
            :active="active"
            :quiz="quiz"
            @back="quizState = { type: 'home' }"
            @active-change="
                (ix) =>
                    (active =
                        ix < 0
                            ? (quiz?.questions.length as number) - 1
                            : ix >= (quiz?.questions.length as number)
                            ? 0
                            : ix)
            "
        />
    </div>
</template>
