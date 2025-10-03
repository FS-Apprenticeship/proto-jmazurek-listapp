<script setup>

import { computed, ref } from 'vue'
import { getEmail } from '@/database/database-control';
import Header from './List/Header.vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { initializeRefreshing } from '@/database/list-control';

defineEmits(['back'])

initializeRefreshing()
const router = useRouter();

const email = getEmail();

</script>

<template>
    <Header :email="email" />
    <div class="tabs">
      <button @click="router.push('/list')">Normal</button>
      <button @click="router.push('/list/trash')">Trash</button>
    </div>
    <router-view></router-view>
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