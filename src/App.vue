<script setup>
import { ref } from 'vue';
import HomeScreen from './components/HomeScreen.vue';
import SignUp from './components/SignUp.vue';

const state = ref("Initial")

</script>

<template>
    <!-- <HomeScreen v-if="state === 'Initial'" :user="user"/> -->
    <SignUp />
</template>

<style scoped>

</style>
