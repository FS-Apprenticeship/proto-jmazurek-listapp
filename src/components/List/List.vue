<script setup>

import { computed, ref } from 'vue'
import Item from './Item.vue';
import { addListItem, deleteListItem, getEmail, getListItems, updateListItem } from '@/database/database-control';
import Header from './Header.vue';
import NewItem from './NewItem.vue';
import EditableItem from './EditableItem.vue';

function refresh() {
    getListItems().then((items) => list.value = items);
}

refresh();

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

async function checkItem(id, checked) {
    const updatedItem = {
      checked: !checked
    }

    const item = await updateListItem(updatedItem, id);

    if (!item) {
      alert("There was a database error, try again!");
      return;
    }

    refresh();

    edit.value = -1;
}

async function trashItem(id) {
    const updatedItem = {
      trashed: true,
      trash_time: new Date()
    }

    const item = await updateListItem(updatedItem, id);

    if (!item) {
      alert("There was a database error, try again!");
      return;
    }

    refresh();
}

async function restoreItem(id) {
    const updatedItem = {
      trashed: false,
      trash_time: null
    }

    const item = await updateListItem(updatedItem, id);

    if (!item) {
      alert("There was a database error, try again!");
      return;
    }

    refresh();
}

async function deleteItem(id) {
  const destroyedItem = await deleteListItem(id);

  if (!destroyedItem) {
    alert("There was a database error, try again!");
    return;
  }

  refresh();
}

const email = getEmail();

const list = ref([]);

const normalList = computed(() => {
  return list.value.filter(item => !item.trashed);
})

const trashedList = computed(() => {
  return list.value.filter(item => item.trashed);
})

const edit = ref(-1);

const mode = ref('Normal');

</script>

<template>
    <Header :email="email" />
    <div class="tabs">
      <button @click="mode = 'Normal'">Normal</button>
      <button @click="mode = 'Trash'">Trash</button>
    </div>
    <ul v-if="mode === 'Normal'">
      <NewItem @create="refresh" />
      <template v-for="item in normalList" :key="item.id">
        <EditableItem v-if="item.id === edit" :item="item" @update="updateItem" />
        <Item v-else :item="item" @edit="edit = item.id" @trash="() => trashItem(item.id)" @check="() => checkItem(item.id, item.checked)"/>
      </template>
    </ul>
    <ul v-else>
        <Item v-for="item in trashedList" :key="item.id" :item="item" @restore="() => restoreItem(item.id)" @delete="() => deleteItem(item.id)" />
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