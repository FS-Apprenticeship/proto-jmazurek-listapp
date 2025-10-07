<script setup>
    import { useListStore } from '@/store/list-store';
    import { ref } from 'vue';

    const emit = defineEmits(['create']);

    const list = useListStore();
    const itemName = ref("");
    
    function add() {
        const success = list.addAnItem(itemName);
        
        if (success) {
            itemName.value = "";
        }
    }
</script>

<template>
    <li class="item">
        <input v-model="itemName" @keyup.enter="add" />
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