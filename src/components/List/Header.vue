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

</style>
