<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3"
import { StarterKit } from "@tiptap/starter-kit"
import { Heading } from "@tiptap/extension-heading"
import { mergeAttributes } from "@tiptap/vue-3"

const currentNote = useState<string | null>("currentNote")

const { data: note, refresh } = await useFetch("/api/noteById", {
    query: { id: currentNote.value as string },
})

const editor = useEditor({
    content: note.value?.content,
    extensions: [
        StarterKit.configure({
            heading: false
        }),
        Heading.configure({ levels: [1, 2] }).extend({
            levels: [1, 2],
            renderHTML({ node, HTMLAttributes }) {
                const level = this.options.levels.includes(node.attrs.level)
                    ? node.attrs.level
                    : this.options.levels[0]
                const classes = {
                    1: 'text-4xl font-medium',
                    2: 'text-2xl',
                }
                return [
                    `h${level}`,
                    mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
                        class: `${classes[level]}`,
                    }),
                    0,
                ]
            },
        })
    ],
    editorProps: {
        attributes: {
            class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none h-full"
        },
    },
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
    <div class="flex flex-col w-[1000px] max-w-[80%] gap-10 relative" v-if="currentNote !== null">
        <!-- <h1 class="text-slate-800 text-6xl font-semibold relative left-6">{{ note.title }}</h1> -->
        <editor-content :editor="editor" class="h-full outline-none p-5" />
    </div>
</template>