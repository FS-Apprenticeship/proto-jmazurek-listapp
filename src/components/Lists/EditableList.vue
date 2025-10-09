<script setup>
import { useMultipleListStore } from '@/store/multiple-list-store';
import { ref } from 'vue';
    const { list } = defineProps({
        list: {
            type: {
                name: String,
            },
            required: true,
        }
    })

    const lists = useMultipleListStore();

    const emit = defineEmits(['complete']);

    const listName = ref(list.name);

    function update() {
        const success = lists.updateListName(listName, list.id)
        if (success) emit('complete')
    }

</script>

<template>
    <li class="list">
        <input v-model="listName" @keypress.enter="update"/>
        <button class="cross-button green" @click="update">✔</button>
    </li>
</template>

<style scoped>
.list { height: 63px; width: 50%; border: 1px solid #000; border-radius: 20px; display: flex; align-items: center; gap: 8px; padding: 0 8px; }
.cross-button { width: 10%; border: 0; border-top-right-radius: 20px; border-bottom-right-radius: 20px; }
input { font-size: larger; width: 85%; padding-left: 5%; border: none; border-top-left-radius: 20px; border-bottom-left-radius: 20px; }
.green { background-color: green; color: white; }
.green:hover { background-color: #159515; }
.red { background-color: #d00000; color: white; }
.red:hover { background-color: #f50000; }
</style>