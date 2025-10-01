<script setup>
import { ref } from 'vue';
import HomeScreen from './components/HomeScreen.vue';
import SignUp from './components/SignUp.vue';
import List from './components/List/List.vue';
import SignIn from './components/SignIn.vue';

const states = [
  "Initial",
  "Sign-Up",
  "Sign-In",
  "Ready"
]

const state = ref(states[0]);

function updateState (newState) {
  if (!states.includes(newState)) return;
  state.value = newState;
}

function logIn() {
  updateState('Ready');
}

function backHome() {
  updateState('Initial');
}

</script>

<template>
  <HomeScreen v-if="state === 'Initial'" @page="updateState" />
  <SignUp v-else-if="state === 'Sign-Up'" @logged-in="logIn" @back="backHome" />
  <SignIn v-else-if="state === 'Sign-In'" @logged-in="logIn" @back="backHome" />
  <List  v-else-if="state === 'Ready'" @back="backHome" />
</template>

<style scoped>

</style>
