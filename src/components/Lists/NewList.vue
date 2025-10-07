<script setup>
import { addList } from '@/database/multiple-list-control';
    import { ref } from 'vue';

    const emit = defineEmits(['create']);

    const listName = ref("");
    
    function add() {
        const success = addList(listName);
        
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
    .cross-button {
        width: 10%;
        border: 0px;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
    }

    input {
        font-size: larger;
        width: 85%;
        padding-left: 5%;
        border: none;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
    }

    .green {
        background-color: green;
        color: white;
    }

    .green:hover {
        background-color: #159515;
    }


    .red {
        background-color: #d00000;
        color: white;
    }

    .red:hover {
        background-color: #f50000;
    }
</style>