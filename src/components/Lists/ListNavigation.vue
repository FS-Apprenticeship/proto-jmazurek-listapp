<script setup>

import { ref } from 'vue'
import SingleList from './SingleList.vue';
import EditableList from './EditableList.vue';
import NewList from './NewList.vue';
import { useMultipleListStore } from '@/store/multiple-list-store';

const lists = useMultipleListStore();
lists.initializeRefreshing();

const edit = ref(-1);
</script>

<template>
    <ul>
      <NewList />
      <template v-for="list in lists.untrashedLists" :key="list.id">
        <EditableList v-if="list.id === edit" :list="list" @complete="edit = -1" />
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