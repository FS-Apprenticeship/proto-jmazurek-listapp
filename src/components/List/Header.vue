<script setup>
defineProps({
  email: {
    type: String,
    required: true,
  },

})
</script>

<template>
    <header><h1>Welcome to the Useful List App {{ email }}</h1></header>
</template>

<style scoped>

</style>
