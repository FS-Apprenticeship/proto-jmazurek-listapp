<script setup>
import { signOut } from '@/database/database-control';
import { endRefreshing } from '@/database/list-control';
import { useRouter } from 'vue-router';

defineProps({
  email: {
    type: String,
    required: true,
  },

})

const emit = defineEmits(['back']);
const router = useRouter();

function logOut() {
  const success = signOut();

  endRefreshing();

  if (success) router.push('/');
  else alert('There was an error in signing out!');
}

</script>

<template>
    <header>
      <h1>Useful List App User: {{ email }}</h1>
      <button @click="logOut">Log Out</button>
    </header>
</template>

<style scoped>

</style>
