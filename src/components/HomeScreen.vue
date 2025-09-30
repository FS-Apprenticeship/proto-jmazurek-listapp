<script setup>
defineProps({
  user: {
    type: String,
    required: true,
  },
})
</script>

<template>
    <header>Welcome to the Useful List App</header>
    <h1 class="green">Hello {{ user }}</h1>
</template>

<style scoped>

</style>
