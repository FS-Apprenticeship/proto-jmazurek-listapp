<script setup>
import { useListStore } from '@/store/list-store';
import Item from './Item.vue';

const list = useListStore();
</script>

<template>
    <ul>
        <Item v-for="item in list.trashedList" :key="item.id" :item="item" />
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