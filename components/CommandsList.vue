<template>
    <div class="items">
        <template v-if="items.length">
            <button
                v-for="(item, index) in items"
                :key="index"
                class="item"
                :class="{ 'is-selected': index === selectedIndex }"
                @click="selectItem(index)"
            >
                <h1 v-if="item.title === 'Heading 1'" class="text-4xl font-bold">{{ item.title }}</h1>
                <h2 v-if="item.title === 'Heading 2'" class="text-3xl font-semibold">{{ item.title }}</h2>
                <b v-if="item.title === 'Bold'">{{ item.title }}</b>
                <em v-if="item.title === 'Italic'">{{ item.title }}</em>
            </button>
        </template>
        <div v-else class="item">No result</div>
    </div>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            required: true,
        },

        command: {
            type: Function,
            required: true,
        },
    },

    data() {
        return {
            selectedIndex: 0,
        }
    },

    watch: {
        items() {
            this.selectedIndex = 0
        },
    },

    methods: {
        onKeyDown({ event }) {
            if (event.key === "ArrowUp") {
                this.upHandler()
                return true
            }

            if (event.key === "ArrowDown") {
                this.downHandler()
                return true
            }

            if (event.key === "Enter") {
                this.enterHandler()
                return true
            }

            return false
        },

        upHandler() {
            this.selectedIndex =
                (this.selectedIndex + this.items.length - 1) % this.items.length
        },

        downHandler() {
            this.selectedIndex = (this.selectedIndex + 1) % this.items.length
        },

        enterHandler() {
            this.selectItem(this.selectedIndex)
        },

        selectItem(index) {
            const item = this.items[index]

            if (item) {
                this.command(item)
            }
        },
    },
}
</script>

<style lang="scss">
.items {
    padding: 0.2rem;
    position: relative;
    border-radius: 0.5rem;
    background: #fff;
    color: rgba(0, 0, 0, 0.8);
    overflow: hidden;
    font-size: 0.9rem;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0px 10px 20px rgba(0, 0, 0, 0.1);
    // width: 100px;
}

.item {
    display: block;
    margin: 0;
    width: 100%;
    text-align: left;
    background: transparent;
    border-radius: 0.4rem;
    border: 1px solid transparent;
    padding: 0.5rem 1rem;
    transition: 0.3s;

    &.is-selected {
        background-color: #e2e8f0;
    }
}
</style>
