import { getID, supabase } from '@/database/database-control';
import { computed, reactive } from 'vue';

export const lists = reactive({
    user_id: getID(),
    value: []
});

export const untrashedLists = computed(() => {
  return lists.value.filter(item => !item.trashed);
})

export const trashedLists = computed(() => {
  return lists.value.filter(item => item.trashed);
})
export async function getLists() {
  const {data, error} = await supabase.from('lists').select('*').eq('user_id', user.id);

  if (error !== null) return false;

  return data;
}

export async function addListToDB(list) {
  const { data, error } = await supabase.from('lists').insert(list).select();

  if (error !== null) return false;

  return data;
}

export async function updateList(list, id) {
  const {data, error} = await supabase.from('lists').update(list).eq('user_id', user.id).eq('id', id).select();

  if (error !== null) return false;

  return data;
}

export async function deleteList(id) {
  const {data, error} = await supabase.from('lists').delete().eq('user_id', user.id).eq('id', id).select();

  if (error !== null) return false;

  return data;
}

export function initializeRefreshing() {
    immediateRefresh();
    refresher = setInterval(immediateRefresh, refreshTime);
}

export function endRefreshing() {
    lists.user_id = undefined;
    lists.value = [];
    clearInterval(refresher);
}

export function immediateRefresh(list_id) {
    if (getID() === undefined) {
        endRefreshing();
        throw Error('No user logged in!')
    }

    getLists().then((items) => lists.value = items);
}

export async function addList(listName) {
    if (listName.value === "") return false;

    const newList = {
        name: itemName.value
    }

    const [list] = await addListToDB(newList);

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

export async function updateListName(name, id) {
    const updatedItem = {
      name: name.value
    }

    const [item] = await updateList(updatedItem, id);

    if (!item) {
      alert("There was a database error, try again!");
      return;
    }

    updateItemInList(item)
}

export async function trashList(id) {
    const updatedList = {
      trashed: true,
    //   trash_time: new Date()
    }

    const [list] = await updateList(updatedList, id);

    if (!list) {
      alert("There was a database error, try again!");
      return;
    }

    updateItemInList(list)
}

export async function restoreList(id) {
    const updatedList = {
      trashed: false,
    //   trash_time: null
    }

    const [list] = await updateList(updatedList, id);

    if (!list) {
      alert("There was a database error, try again!");
      return;
    }

    updateItemInList(list)
}

export async function deleteList(id) {
  const [destroyedList] = await deleteList(id);

  if (!destroyedList) {
    alert("There was a database error, try again!");
    return;
  }

  const index = lists.value.findIndex(item => item.id === id)
  if (index === -1) return;
  lists.value.splice(index, 1);
}
