import { getID, supabase } from '@/database/database-control';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

async function getLists() {
  const {data, error} = await supabase.from('lists').select('*').eq('user_id', user_id.value);

  if (error !== null) return false;

  return data;
}

async function addListToDB(list) {
  const { data, error } = await supabase.from('lists').insert(list).select();

  if (error !== null) throw error;

  return data[0];
}

async function updateList(list, id) {
  const {data, error} = await supabase.from('lists').update(list).eq('user_id', user_id.value).eq('id', id).select();

  if (error !== null) return false;

  return data[0];
}

async function deleteList(id) {
  const {data, error} = await supabase.from('lists').delete().eq('user_id', user_id.value).eq('id', id).select();

  if (error !== null) return false;

  return data[0];
}

const refreshTime = 1000 * 60 * 10

export const useMultipleListStore = defineStore('multiple-lists', () => {
    const lists = ref([])
    const user_id = getID()

    const untrashedLists = computed(() => {
        console.log(Array.isArray(lists.value), lists.value);
        return lists.value.filter(item => !item.trashed);
    })

    const trashedLists = computed(() => {
        return lists.value.filter(item => item.trashed);
    })

    let refresher

    function initializeRefreshing() {
        immediateRefresh();
        refresher = setInterval(immediateRefresh, refreshTime);
    }

    function endRefreshing() {
        user_id.value = undefined;
        lists.value = [];
        clearInterval(refresher);
    }

    function immediateRefresh() {
        if (getID() === undefined) {
            endRefreshing();
            throw Error('No user logged in!')
        }

        getLists().then((items) => {
        if (items === false) return;
            lists.value = items
        });
    }

    async function addList(listName) {
        if (listName.value === "") return false;

        const newList = {
            name: listName.value
        }

        const list = await addListToDB(newList);

        if (!list) {
            alert("There was a database error, try again!");
            return false;
        }

        lists.value.push(list);

        return true;
    }

    function updateItemInList(list) {
        const index = lists.value.findIndex(i => {
            return i.id === list.id
        });
        lists.value[index] = list;
    }

    async function updateListName(name, id) {
        const updatedList = {
            name: name.value
        }

        const item = await updateList(updatedList, id);

        if (!item) {
            alert("There was a database error, try again!");
            return;
        }

        updateItemInList(item)
    }

    async function trashList(id) {
        const updatedList = {
            trashed: true,
        //   trash_time: new Date()
        }

        const list = await updateList(updatedList, id);

        if (!list) {
            alert("There was a database error, try again!");
            return;
        }

        updateItemInList(list)
    }

    async function restoreList(id) {
        const updatedList = {
            trashed: false,
        //   trash_time: null
        }

        const list = await updateList(updatedList, id);

        if (!list) {
            alert("There was a database error, try again!");
            return;
        }

        updateItemInList(list)
    }

    async function deleteThisList(id) {
        const destroyedList = await deleteList(id);

        if (!destroyedList) {
            alert("There was a database error, try again!");
            return;
        }

        const index = lists.value.findIndex(item => item.id === id)
        if (index === -1) return;
        lists.value.splice(index, 1);
    }

    return {
        lists,
        untrashedLists,
        trashedLists,
        refresher,
        initializeRefreshing,
        endRefreshing,
        immediateRefresh,
        addList,
        updateItemInList,
        updateListName,
        trashList,
        restoreList,
        deleteThisList
    }
})