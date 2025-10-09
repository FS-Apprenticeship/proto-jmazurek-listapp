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
ul { display: flex; flex-wrap: wrap; gap: 8px; padding: 0; margin: 0; list-style: none; }
.list { height: 63px; width: 50%; border: 1px solid #000; border-radius: 20px; display: flex; align-items: center; padding: 0 8px; }
.selected { background: #e5e7eb; }
.edit { font-size: larger; width: 10%; border: none; border-left: 1px solid #000; }
.delete { margin-left: auto; width: 15%; display: flex; justify-content: center; }
#trash-button, #delete-button, #restore-button { border: none; }
#trash-button { border-top-right-radius: 20px; border-bottom-right-radius: 20px; }
</style>