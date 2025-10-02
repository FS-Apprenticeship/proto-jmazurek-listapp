<script setup>
    import { addListItem } from '@/database/database-control';
    import { ref } from 'vue';

    const emit = defineEmits(['create']);

    const itemName = ref("");

    async function addAnItem() {
        if (itemName.value === "") return;
    
        const newItem = {
            name: itemName.value,
            checked: false,
            trashed: false,
        }

        const item = await addListItem(newItem);

        if (!item) {
            alert("There was a database error, try again!");
            return;
        }

        itemName.value = "";

        emit('create');
    }

</script>

<template>
    <li class="item">
        <input v-model="itemName" @keyup.enter="addAnItem" />
        <button class="cross-button green" @click="addAnItem">✔</button>
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