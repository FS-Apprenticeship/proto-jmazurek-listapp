<script setup>

import { ref } from 'vue'
import Item from './Item.vue';
import NewItem from './NewItem.vue';
import EditableItem from './EditableItem.vue';
import { initializeRefreshing } from '@/database/multiple-list-control';

initializeRefreshing();

const edit = ref(-1);

</script>

<template>
    <ul>
      <NewItem />
      <template v-for="item in untrashedList" :key="item.id">
        <EditableItem v-if="item.id === edit" :item="item" @complete="edit = -1" />
        <Item v-else :item="item" @edit="edit = item.id" @trash="() => trashItem(item.id)" @check="() => checkItem(item.id, item.checked)"/>
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