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