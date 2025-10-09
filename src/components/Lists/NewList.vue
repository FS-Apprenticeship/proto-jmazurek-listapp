<script setup>
import { useMultipleListStore } from '@/store/multiple-list-store';
    import { ref } from 'vue';

    const listName = ref("");
    const lists = useMultipleListStore();
    
    function add() {
        const success = lists.addList(listName);
        
        if (success) {
            listName.value = "";
        }
    }
</script>

<template>
    <li class="list">
        <input v-model="listName" @keyup.enter="add" />
        <button class="cross-button green" @click="add">✔</button>
    </li>
</template>

<style scoped>
.list { height: 63px; width: 50%; border: 1px solid #000; border-radius: 20px; display: flex; align-items: center; padding: 0 8px; }
.cross-button { width: 10%; border: 0; border-top-right-radius: 20px; border-bottom-right-radius: 20px; }
input { font-size: larger; width: 85%; padding-left: 5%; border: none; border-top-left-radius: 20px; border-bottom-left-radius: 20px; }
.green { background-color: green; color: white; }
.green:hover { background-color: #159515; }
.red { background-color: #d00000; color: white; }
.red:hover { background-color: #f50000; }
</style>