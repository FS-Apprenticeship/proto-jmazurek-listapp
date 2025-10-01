<script setup>
import { ref } from 'vue'
import Item from './Item.vue';

const list = ref([
    {
        name: "Idea!",
        // message: String, //Use to add more detail, but not right now
        crossedOff: false,
        trashed: false,
    }
]);
</script>

<template>
  <ul>
    <Item v-for="item in list" :key="item.id" :item="item" />
  </ul>
</template>