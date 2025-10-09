<script setup>

import { ref } from 'vue'
import Item from './Item.vue';
import NewItem from './NewItem.vue';
import EditableItem from './EditableItem.vue';
import { useListStore } from '@/store/list-store';

const edit = ref(-1);

const list = useListStore();

</script>

<template>
    <ul>
      <NewItem />
      <template v-for="item in list.untrashedList" :key="item.id">
        <EditableItem v-if="item.id === edit" :item="item" @complete="edit = -1" />
        <Item v-else :item="item" @edit="edit = item.id"/>
      </template>
    </ul>
</template>

<style scoped>
ul { padding: 0; margin: 0; list-style: none; display: flex; flex-direction: column; gap: 12px; }
.item { height: 63px; width: 50%; border: 1px solid #000; border-radius: 20px; display: flex; align-items: center; gap: 8px; padding: 0 8px; }
</style>