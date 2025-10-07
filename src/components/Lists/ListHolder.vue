<script setup>
import { getEmail } from '@/database/database-control';
import Header from '../List/Header.vue';
import { useRoute, useRouter } from 'vue-router';
import { initializeRefreshing } from '@/database/list-control';
import ListNavigation from './ListNavigation.vue';
import { watch } from 'vue';

defineEmits(['back'])

const route = useRoute();
const router = useRouter();

const email = getEmail();

watch(route.params.id, () => initializeRefreshing(route.params.id))
</script>

<template>
    <Header :email="email" />
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