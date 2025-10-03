import { deleteListItem, getID, getListItems, updateListItem } from '@/database/database-control';
import { reactive } from 'vue';

const list = reactive({
    user_id: getID(),
    list_id: 0,
    value: []
});

let refresher

const refreshTime = 1000 * 60 * 10
export function initializeRefreshing() {
    immediateRefresh
    refresher = setInterval(immediateRefresh, refreshTime);
}

export function endRefreshing() {
    list.user_id = undefined;
    list.list_id = 0;
    list.value = [];
    clearInterval(refresher);
}

export function immediateRefresh() {
    if (getID() === undefined) {
        endRefreshing();
        throw Error('No user logged in!')
    }
    getListItems().then((items) => list.value = items);
}

async function addAnItem() {
    if (itemName.value === "") return false;

    const newItem = {
        name: itemName.value,
        checked: false,
        trashed: false,
    }

    const item = await addListItem(newItem);

    if (!item) {
        alert("There was a database error, try again!");
        return false;
    }

    list.value.push(item);

    return true;
}

function updateItemInList(item) {
    const index = list.value.findIndex(i => i.id === item.id);
    list.value[index] = item;
}

export async function updateItemName(name, id) {
    const updatedItem = {
      name
    }

    const item = await updateListItem(updatedItem, id);

    if (!item) {
      alert("There was a database error, try again!");
      return;
    }

    updateItemInList(item)
}

export async function checkItem(id, checked) {
    const updatedItem = {
      checked: !checked
    }

    const item = await updateListItem(updatedItem, id);

    if (!item) {
      alert("There was a database error, try again!");
      return;
    }

    updateItemInList(item)
}

export async function trashItem(id) {
    const updatedItem = {
      trashed: true,
      trash_time: new Date()
    }

    const item = await updateListItem(updatedItem, id);

    if (!item) {
      alert("There was a database error, try again!");
      return;
    }

    updateItemInList(item)
}

export async function restoreItem(id) {
    const updatedItem = {
      trashed: false,
      trash_time: null
    }

    const item = await updateListItem(updatedItem, id);

    if (!item) {
      alert("There was a database error, try again!");
      return;
    }

    updateItemInList(item)
}

export async function deleteItem(id) {
  const destroyedItem = await deleteListItem(id);

  if (!destroyedItem) {
    alert("There was a database error, try again!");
    return;
  }

  const index = list.value.findIndex(item => item.id === id)
  if (index === -1) return;
  list.value.splice(index, 1);
}
