<script setup>
import { useListStore } from '@/store/list-store';
import { ref } from 'vue';
    const { item } = defineProps({
        item: {
            type: {
                name: String,
                message: String, //Use to add more detail, but not right now
                crossedOff: Boolean,
                trashed: Boolean,
            },
            required: true,
        }
    })

    const emit = defineEmits(['complete']);
    const list = useListStore();

    const itemName = ref(item.name);

    function update() {
        const success = list.updateItemName(itemName, item.id)
        if (success) emit('complete')
    }

</script>

<template>
    <li class="item">
        <input v-model="itemName" @keypress.enter="update"/>
        <button class="cross-button green" @click="update">✔</button>
    </li>
</template>

<style scoped>
    li.item { align-items: center; }
input { width: 85%; padding-left: 5%; border: none; border-radius: 6px; font-size: 1rem; }
.cross-button { width: 14%; border: 0; border-radius: 0 6px 6px 0; margin-left: auto; }
.green { background-color: green; color: white; }
.green:hover { background-color: #159515; }
.red { background-color: #d00000; color: white; }
.red:hover { background-color: #f50000; }
</style>