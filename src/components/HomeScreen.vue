<script setup>
  import { useRouter } from 'vue-router';

  const router = useRouter();

</script>

<template>
  <header>
    <h1>Welcome to the Useful List App</h1>
    <button class="rounded" @click="router.push('/sign-up')">Sign Up</button>
    <button class="rounded" @click="router.push('/sign-in')">Sign In</button>
  </header>
  <main>
    <p>This is the useful list app, developed for Flatiron</p>
  </main>
</template>

<style scoped>
  header {
    height: 20%;
    width: 100%;
    display: flex;
    align-items: center;

    background-color: lightseagreen;
  }

  h1 {
    margin-left: 5px;
    margin-right: auto;
  }

  .rounded {
    height: 75%;
    width: 10%;
    border-radius: 5px;
    margin-right: 5px;
  }
</style>
