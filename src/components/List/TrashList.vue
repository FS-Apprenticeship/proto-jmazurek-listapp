<script setup>
import { deleteItem, restoreItem, trashedList } from '@/database/list-control';
import Item from './Item.vue';
</script>

<template>
    <ul>
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