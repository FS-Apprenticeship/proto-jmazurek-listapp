<script setup>
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

    defineEmits(['update']);

    const itemName = ref(item.name);

</script>

<template>
    <li v-if="mode === 'View'" class="item">
        <input v-model="itemName" />
        <button class="cross-button green" @click="$update('update', item.name)">✔</button>
    </li>
</template>

<style scoped>
    .item {
        width: 50%;
        border: solid 1px black;
        border-radius: 20px;
        
        display: flex;
        flex-direction: row;
    }

    .cross-button {
        width: 10%;
        border: 0px;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
    }

    input {
        width: 75%;
        padding-left: 5%;
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