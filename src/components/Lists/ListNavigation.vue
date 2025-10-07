<script setup>

import { ref } from 'vue'
import { initializeRefreshing, untrashedLists } from '@/database/multiple-list-control';
import SingleList from './SingleList.vue';
import EditableList from './EditableList.vue';
import NewList from './NewList.vue';

initializeRefreshing();

const edit = ref(-1);

</script>

<template>
    <ul>
      <NewList />
      <template v-for="list in untrashedLists" :key="list.id">
        <EditableList v-if="list.id === edit" :list="item" @complete="edit = -1" />
        <SingleList v-else :list="list" @edit="edit = list.id"/>
      </template>
    </ul>
</template>

<style scoped>
  .list {
        height: 63px;
        width: 50%;
        border: solid 1px black;
        border-radius: 20px;
        
        display: flex;
        flex-direction: row;
        margin-bottom: 20px;
    }

    ul {
      display: flex;
      flex-direction: row;
    }
</style>