<script setup>
import { signOut } from '@/database/database-control';

defineProps({
  email: {
    type: String,
    required: true,
  },

})

const emit = defineEmits(['back']);

function logOut() {
  const success = signOut();

  if (success) emit('back');
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
