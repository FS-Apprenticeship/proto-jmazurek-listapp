<script setup>
import Header from '../List/Header.vue';
import { useRoute, useRouter } from 'vue-router';
import ListNavigation from './ListNavigation.vue';
import { watch } from 'vue';
import { useListStore } from '@/store/list-store';

const route = useRoute();
const router = useRouter();
</script>

<template>
    <Header />
    <ListNavigation />
    <div class="tabs" v-if="$route.params.id !== undefined">
      <button @click="router.push(`/list/${route.params.id}`)">Normal</button>
      <button @click="router.push(`/list/${route.params.id}/trash`)">Trash</button>
    </div>
    <router-view />
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