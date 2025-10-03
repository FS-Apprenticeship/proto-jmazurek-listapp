<script setup>

import { computed, ref } from 'vue'
import Item from './Item.vue';
import { deleteListItem, getEmail, getListItems, updateListItem } from '@/database/database-control';
import Header from './Header.vue';
import NewItem from './NewItem.vue';
import EditableItem from './EditableItem.vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

defineEmits(['back'])

const route = useRoute();
const router = useRouter();

const email = getEmail();

const list = ref([]);

const normalList = computed(() => {
  return list.value.filter(item => !item.trashed);
})

const trashedList = computed(() => {
  return list.value.filter(item => item.trashed);
})

const edit = ref(-1);

const mode = ref('Normal');

</script>

<template>
    <Header :email="email" />
    <div class="tabs">
      <button @click="mode = 'Normal'">Normal</button>
      <button @click="router.push('/list/trash')">Trash</button>
    </div>
    <ul>
      <NewItem @create="refresh" />
      <template v-for="item in normalList" :key="item.id">
        <EditableItem v-if="item.id === edit" :item="item" @update="updateItem" />
        <Item v-else :item="item" @edit="edit = item.id" @trash="() => trashItem(item.id)" @check="() => checkItem(item.id, item.checked)"/>
      </template>
    </ul>
</template>

<style scoped>
  .item {
        height: 63px;
        width: 50%;
        border: solid 1px black;
        border-radius: 20px;
        
        display: flex;
        flex-direction: row;
        margin-bottom: 20px;
    }
</style>