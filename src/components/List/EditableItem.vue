<script setup>
import { updateItemName } from '@/database/list-control';
import { ref } from 'vue';
    const { item } = defineProps({
        item: {
            type: {
                name: String,
                message: String, //Use to add more detail, but not right now
                crossedOff: Boolean,
                trashed: Boolean,
            },
            required: true,
        }
    })

    const emit = defineEmits(['complete']);

    const itemName = ref(item.name);

    function update() {
        const success = updateItemName(itemName, item.id)
        if (success) emit('complete')
    }

</script>

<template>
    <li class="item">
        <input v-model="itemName" @keypress.enter="update"/>
        <button class="cross-button green" @click="update">✔</button>
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