<script setup>
// {
//     name: "Idea!",
//     // message: String, //Use to add more detail, but not right now
//     crossedOff: false,
//     trashed: false,
// }

import { ref, watchEffect } from 'vue'
import Item from './Item.vue';
import { addListItem, getEmail, getListItems, updateListItem } from '@/database/database-control';
import Header from './Header.vue';
import NewItem from './NewItem.vue';
import EditableItem from './EditableItem.vue';

function refresh() {
    getListItems().then((items) => list.value = items);
}

refresh();

async function addAnItem(name) {
    if (name === "") return;
  
    const newItem = {
    name,
    checked: false,
    trashed: false,
    }

    const item = await addListItem(newItem);

    if (!item) {
      alert("There was a database error, try again!");
      return;
    }

    list.value.unshift(item);

    refresh();
}

const email = getEmail();

const list = ref([]);

const edit = ref(-1);

async function updateItem(name) {
    const updatedItem = {
      name
    }

    const item = await updateListItem(updatedItem, edit.value);

    if (!item) {
      alert("There was a database error, try again!");
      return;
    }

    refresh();

    edit.value = -1;
}

</script>

<template>
    <Header :email="email" />
    <ul>
      <NewItem @create="addAnItem" />
      <template v-for="item in list" :key="item.id">
        <EditableItem v-if="item.id === edit" :item="item" @update="updateItem" />
        <Item v-else :item="item" @edit="edit = item.id"/>
      </template>
    </ul>
</template>

<style scoped>
  .item {
        height: 63px;
        width: 50%;
        border: solid 1px black;
        border-radius: 20px;
        
        display: flex;
        flex-direction: row;
        margin-bottom: 20px;
    }
</style>