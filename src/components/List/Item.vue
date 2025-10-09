<script setup>
import { useListStore } from '@/store/list-store';
import { ref } from 'vue';

    const { item } = defineProps({
        item: {
            required: true,
        },
    })

    const list = useListStore();

    function check() {
        console.log(item);
        list.checkItem(item.id, !item.checked)
    }

    function trash() {
        list.trashItem(item.id);
    }

    function restore() {
        list.restoreItem(item.id);
    }

    function deleteItem() {
        list.deleteItem(item.id)
    }

    defineEmits(['edit']);

    const mode = ref("View");

</script>

<template>
    <li v-if="mode === 'View'" class="item">
        <button class="cross-button" :class="item.checked ? 'green' : ''" @click="check">
            {{item.checked ? "✔" : "✗"}}
        </button>
        <h3>{{ item.name }}</h3>
        <button v-if="!item.trashed" class="edit" @click="$emit('edit')">⚙</button>
        <div class="delete">
            <button v-if="!item.trashed" id="trash-button" class="red" @click="trash">🗑︎</button>
            <div v-else>
                <button id="delete-button" class="red" @click="deleteItem">Delete!</button>
                <button id="restore-button" class="green" @click="restore">↩︎ Restore</button>
            </div>
        </div>
    </li>
</template>

<style scoped>
.item { align-items: center; height: 63px; width: 50%; border: 1px solid #000; border-radius: 20px; display: flex; flex-direction: row; margin-bottom: 20px; }
.cross-button { width: 10%; border: none; border-right: 1px solid #000; border-top-left-radius: 20px; border-bottom-left-radius: 20px; }
h3 { width: 70%; padding-left: 5%; }
.edit { font-size: larger; width: 10%; border: none; border-left: 1px solid #000; }
.delete { margin-left: auto; width: 20%; display: flex; justify-content: center; }
#trash-button, #delete-button, #restore-button { border: none; border-top-right-radius: 20px; border-bottom-right-radius: 20px; }
#trash-button { background-color: #d9d9d9; }
#delete-button { background-color: #e33; color: white; }
#restore-button { background-color: #4caf50; color: white; }
.green { background-color: green; color: white; }
.green:hover { background-color: #159515; }
.red { background-color: #d00000; color: white; }
.red:hover { background-color: #f50000; }
</style>