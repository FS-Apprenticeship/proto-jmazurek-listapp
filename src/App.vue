<script setup>
import { ref } from 'vue';
import HomeScreen from './components/HomeScreen.vue';

const state = ref("Initial")

</script>

<template>
  <main>
    <HomeScreen v-if="state === 'Initial'" :user="user"/>
    
  </main>
</template>

<style scoped>

</style>
