<script setup>
import { ref } from 'vue';

    defineProps({
    item: {
        type: {
            name: String,
            message: String, //Use to add more detail, but not right now
            crossedOff: Boolean,
            trashed: Boolean,
        },
        required: true,
    },
    })

    defineEmits(['update', 'crossOff', 'trash', 'restore','delete']);

    const mode = ref("View");

</script>

<template>
    <li v-if="mode === 'View'" class="item">
        <button class="cross-button" :class="item.crossedOff ? 'green' : ''" @click="$emit('crossOff', item)">
            <p v-if="item.crossedOff">✔</p>
            <p v-else>✗</p>
        </button>
        <h3>{{ item.name }}</h3>
        <div class="delete">
            <button v-if="!item.trashed" id="trash-button" class="red">🗑︎</button>
            <div v-else>
                <button id="delete-button" class="red">Delete!</button>
                <button id="restore-button" class="green">↩︎ Restore</button>
            </div>
        </div>
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
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
    }

    h3 {
        width: 75%;
        padding-left: 5%;
    }

    .delete {
        width: 10%;
        border-bottom-right-radius: 20px;
    }

    .delete * {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    #trash-button {
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        border: 0px;
    }

    #delete-button {
        border-top-right-radius: 20px;
        border: 0px;
    }

    #restore-button {
        border-bottom-right-radius: 20px;
        border: 0px;
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