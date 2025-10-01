<script setup>
// {
//     name: "Idea!",
//     // message: String, //Use to add more detail, but not right now
//     crossedOff: false,
//     trashed: false,
// }

import { ref, watchEffect } from 'vue'
import Item from './Item.vue';
import { addListItem, getEmail, getListItems } from '@/database/database-control';
import Header from './Header.vue';

const email = getEmail();

const list = ref([]);

function refresh() {
    getListItems().then((items) => list.value = items);
}

function addOnAnotherItemTemporary() {
    const something = {
    name: "Something :|",
    crossedOff: false,
    trashed: false,
    }

    addListItem(something);
    refresh();
}

refresh();
</script>

<template>
    <Header :email="email" />
    <button @click="addOnAnotherItemTemporary">Add something!</button>
  <ul>
    <Item v-for="item in list" :key="item.id" :item="item" />
  </ul>
</template>