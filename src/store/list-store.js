import { defineStore } from "pinia";
import { getID, supabase } from '@/database/database-control';
import { computed, ref, watch } from 'vue';
import { useRoute } from "vue-router";

//DB handling
async function getListItems(listID) {
    if (listID === undefined) return false;
    const {data, error} = await supabase.from('items').select('*').eq('list_id', listID);

    if (error !== null) return false;
    return data;
}

async function addListItem(listID, item) {
    if (listID === undefined) return false;
    const { data, error } = await supabase.from('items').insert({...item, list_id: listID}).select();

    if (error !== null) return false;

    return data;
}

async function updateListItem(listID, item, itemID) {
    if (listID === undefined) return false;
    const {data, error} = await supabase.from('items').update(item).eq('list_id', listID).eq('id', itemID).select();

    if (error !== null) return false;

    return data;
}

async function deleteListItem(listID, itemID) {
    if (listID === undefined) return false;
    const {data, error} = await supabase.from('items').delete().eq('list_id', listID).eq('id', itemID).select();

    if (error !== null) return false;

    return data;
}

const refreshTime = 1000 * 60 * 10
//Store
export const useListStore = defineStore('list', () => {
    const route = useRoute();
    const listID = route.params.id;
    const list = ref([]);

    watch(listID, initializeRefreshing)

    const untrashedList = computed(() => {
        return list.value.filter(item => !item.trashed);
    })

    const trashedList = computed(() => {
        return list.value.filter(item => item.trashed);
    })

    let refresher

    function initializeRefreshing() {
        endRefreshing();
        immediateRefresh();
        refresher = setInterval(immediateRefresh, refreshTime);
    }

    function endRefreshing() {
        list.value = [];
        clearInterval(refresher);
    }

    function immediateRefresh() {
        if (getID() === undefined) {
            endRefreshing();
            throw Error('No user logged in!')
        }

        if (listID === undefined) {
            endRefreshing();
            throw Error("No list specified");
        }

        getListItems(listID).then((items) => list.value = items);
    }

    async function addAnItem(itemName) {
        if (itemName.value === "") return false;

        const newItem = {
            name: itemName.value,
            checked: false,
            trashed: false,
        }

        const [item] = await addListItem(listID, newItem);

        if (!item) {
            alert("There was a database error, try again!");
            return false;
        }

        list.value.push(item);

        return true;
    }

    function updateItemInList(item) {
        const index = list.value.findIndex(i => {
            return i.id === item.id
        });
        list.value[index] = item;
    }

    async function updateItemName(name, id) {
        const updatedItem = {
            name: name.value
        }

        const [item] = await updateListItem(listID, updatedItem, id);

        if (!item) {
            alert("There was a database error, try again!");
            return;
        }

        updateItemInList(item)
    }

    async function checkItem(id, checked) {
        const updatedItem = {
            checked: !checked
        }

        const [item] = await updateListItem(listID, updatedItem, id);

        if (!item) {
            alert("There was a database error, try again!");
            return;
        }

        updateItemInList(item)
    }

    async function trashItem(id) {
        const updatedItem = {
            trashed: true,
            trash_time: new Date()
        }

        const [item] = await updateListItem(listID, updatedItem, id);

        if (!item) {
            alert("There was a database error, try again!");
            return;
        }

        updateItemInList(item)
    }

    async function restoreItem(id) {
        const updatedItem = {
            trashed: false,
            trash_time: null
        }

        const [item] = await updateListItem(listID, updatedItem, id);

        if (!item) {
            alert("There was a database error, try again!");
            return;
        }

        updateItemInList(item)
    }

    async function deleteItem(id) {
        const [destroyedItem] = await deleteListItem(listID, id);

        if (!destroyedItem) {
            alert("There was a database error, try again!");
            return;
        }

        const index = list.value.findIndex(item => item.id === id)
        if (index === -1) return;
        list.value.splice(index, 1);
    }

    return {
        list,
        untrashedList,
        trashedList,
        refresher,
        initializeRefreshing,
        endRefreshing,
        immediateRefresh,
        addAnItem,
        updateItemInList,
        updateItemName,
        checkItem,
        trashItem,
        restoreItem,
        deleteItem
    }
})