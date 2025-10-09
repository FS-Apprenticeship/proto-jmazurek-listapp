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
.item { height: 63px; width: 50%; border: 1px solid #000; border-radius: 20px; display: flex; align-items: center; gap: 8px; padding: 0 8px; }
</style>