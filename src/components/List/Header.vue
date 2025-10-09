<script setup>
import { useListStore } from '@/store/list-store';
import { useMultipleListStore } from '@/store/multiple-list-store';
import { useUserStore } from '@/store/user-store';
import { useRouter } from 'vue-router';

const user = useUserStore();
const multipleLists = useMultipleListStore();
const list = useListStore();

const router = useRouter();

function logOut() {
  const success = user.signOut();

  list.endRefreshing();
  multipleLists.endRefreshing();

  if (success) router.push('/');
  else alert('There was an error in signing out!');
}

</script>

<template>
    <header>
      <h1>Useful List App User: {{ user.email }}</h1>
      <button @click="logOut">Log Out</button>
    </header>
</template>

<style scoped>
header { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: #f8fafc; border-bottom: 1px solid #e5e7eb; }
h1 { margin: 0; font-size: 1.1rem; }
button { background: #1f2937; color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; }
</style>
