<script setup lang="ts">
    import { Editor, EditorContent } from '@tiptap/vue-3'
    import StarterKit from '@tiptap/starter-kit'

    const editor = ref(new Editor({
        content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
        extensions: [
            StarterKit,
        ],
    })  )


    onBeforeUnmount(() => {
        editor.value.destroy()
    })


    const currentNote = useState<string | null>("currentNote")

    const { data: note, refresh } = useFetch('/api/noteById', { query: currentNote.value })


</script>

<template>
    <div class="flex flex-col w-[1000px] max-w-[80%] gap-10 relative top-60" v-if="currentNote!==null">
        <!-- <h1 class="text-slate-800 text-6xl font-semibold relative left-6">{{ note.title }}</h1> -->
        <editor-content :editor="editor" />
    </div>
</template>