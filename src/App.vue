<script setup>
import { ref } from 'vue';
import HomeScreen from './components/HomeScreen.vue';
import SignUp from './components/SignUp.vue';
import List from './components/List/List.vue';

const state = ref("Initial")

</script>

<template>
    <!-- <HomeScreen v-if="state === 'Initial'" :user="user"/> -->
    <!-- <SignUp /> -->
  <List />
</template>

<style scoped>

</style>
