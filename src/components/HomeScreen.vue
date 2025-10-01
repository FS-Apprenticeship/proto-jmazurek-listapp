<script setup>
  defineEmits(['page']);
</script>

<template>
  <header>
    <h1>Welcome to the Useful List App</h1>
    <button class="rounded" @click="$emit('page', 'Sign-Up')">Sign Up</button>
    <button class="rounded" @click="$emit('page', 'Sign-In')">Sign In</button>
  </header>
  <main>
    <p>This is the useful list app, developed for Flatiron</p>
  </main>
</template>

<style scoped>
  .rounded {
    border-radius: 10px;
  }
</style>
