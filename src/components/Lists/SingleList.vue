<script setup>
import { useMultipleListStore } from '@/store/multiple-list-store';
import { useRoute, useRouter } from 'vue-router';
    defineProps({
        list: {
            type: {
                name: String,
                id: String,
                trashed: Boolean
            },
            required: true,
        },
    })

    const route = useRoute();
    const router = useRouter();
    const lists = useMultipleListStore();

    defineEmits('edit');

</script>

<template>
    <li class="list" @click="router.push(`/list/${list.id}`)" :class="route.params.id === list.id ? 'selected': ''">
        <h3>{{ list.name }}</h3>
        <button v-if="!list.trashed" class="edit" @click="$emit('edit')">⚙</button>
        <div class="delete">
            <button v-if="!list.trashed" id="trash-button" class="red" @click="lists.trashList(list.id)">🗑︎</button>
            <div v-else>
                <button id="delete-button" class="red" @click="lists.deleteThisList(list.id)">Delete!</button>
                <button id="restore-button" class="green" @click="lists.restoreList(list.id)">↩︎ Restore</button>
            </div>
        </div>
    </li>
</template>

<style scoped>
    h3 {
        width: 70%;
        padding-left: 5%;
    }

    .selected {
        background-color: lightgray;
    }

    .edit {
        font-size: larger;
        width: 10%;
        justify-content: center;
        border: none;
        border-left: 1px solid black;
    }

    .delete {
        margin-left: auto;
        width: 15%;
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