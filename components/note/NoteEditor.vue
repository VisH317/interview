<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3"
import { StarterKit } from "@tiptap/starter-kit"
import { Placeholder } from "@tiptap/extension-placeholder"
import { Heading } from "@tiptap/extension-heading"
import { mergeAttributes } from "@tiptap/vue-3"
import suggestion from "../../utils/suggestion"
import Commands from "../../utils/commands"

const currentNote = useState<string | null>("currentNote")

const { data: note, refresh } = await useFetch("/api/noteById", {
    query: { id: currentNote.value as string },
})

const visible = ref<boolean>(true)

console.log("content: ", note.value?.content.slice(-7))

const content = ref<string>(
    note.value?.content.split("<").length - 1 <= 2
        ? (note.value?.content as string) + "type something here..."
        : (note.value?.content as string)
)

const editor = useEditor({
    content:
        note.value?.content.slice(-7) === "<p></p>"
            ? note.value?.content
            : note.value?.content + "<p></p>",
    extensions: [
        StarterKit.configure({
            heading: false,
        }),
        Heading.configure({ levels: [1, 2] }).extend({
            levels: [1, 2],
            renderHTML({ node, HTMLAttributes }) {
                const level = this.options.levels.includes(node.attrs.level)
                    ? node.attrs.level
                    : this.options.levels[0]
                const classes = {
                    1: "text-4xl font-medium",
                    2: "text-2xl",
                }
                return [
                    `h${level}`,
                    mergeAttributes(
                        this.options.HTMLAttributes,
                        HTMLAttributes,
                        {
                            class: `${classes[level]}`,
                        }
                    ),
                    0,
                ]
            },
        }),
        Placeholder.configure({
            placeholder: "Start writing here... (Type / to see actions)",
            emptyNodeClass:
                "first:before:text-gray-400 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none first:before:h-0",
        }),
        Commands.configure({
            suggestion,
        }),
    ],
    editorProps: {
        attributes: {
            class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none h-full",
        },
    },
    onFocus({ editor, event }) {
        visible.value = false
    },
    onBlur({ editor, event }) {
        visible.value = true
    },
    onUpdate({ editor }) {
        console.log("editor: ", editor)
    }
})

onBeforeUnmount(async () => {
    const html = editor.value?.getHTML()
    console.log("WHY ARE YOU UNOMUNTING???")
    await $fetch("/api/note", {
        method: "PATCH",
        body: {
            id: note.value?.id,
            content: html,
        },
    })
    // editor.value?.destroy()
})
</script>

<template>
    <div
        class="flex w-[1200px] pt-[5%] max-w-[85%] gap-10 relative flex-col min-h-screen"
        @keyup="() => console.log('test')"
        @click="() => editor?.commands.focus()"
        v-if="currentNote !== null"
    >
        <h1 class="text-slate-800 text-7xl font-bold pl-[10%]">
            {{ note.title }}
        </h1>
        <editor-content
            :editor="editor"
            class="min-h-20 outline-none p-5 w-full"
        />
        <!-- <div :class="`${visible ? 'h-0' : 'h-16'} duration-300`"/> -->
        <div class="h-16"/>
        <div :class="`flex flex-row pl-[10%] gap-5 ${visible ? 'visible opacity-100' : 'opacity-30 hover:opacity-100'} duration-300`">
            <button
                class="bg-gradient-to-r from-pink-300 to-blue-300 px-4 py-2 text-white font-light rounded-[40px] hover:opacity-70 duration-300 disabled:cursor-default"
                :disabled="visible"
                @click.stop
            >
                Add Website
            </button>
            <button
                class="bg-gradient-to-r from-pink-300 to-blue-300 px-4 py-2 text-white font-light rounded-[40px] hover:opacity-70 duration-300"
                :disabled="visible"
                @click.stop
            >
                Add Video
            </button>
            <button
                class="bg-gradient-to-r from-pink-300 to-blue-300 px-4 py-2 text-white font-light rounded-[40px] hover:opacity-70 duration-300"
                :disabled="visible"
                @click.stop
            >
                Start Quiz
            </button>
            <button
                class="bg-gradient-to-r from-pink-300 to-blue-300 px-4 py-2 text-white font-light rounded-[40px] hover:opacity-70 duration-300"
                :disabled="visible"
                @click.stop
            >
                Open Flashcards
            </button>
        </div>
    </div>
</template>
