import { deleteListItem, getEmail, getID, getListItems, updateListItem } from '@/database/database-control';
import { reactive, ref, watch } from 'vue';

const list = reactive({
    user_id: getID(),
    list_id: 0,
    value: []
});

export function refresh() {
    getListItems().then((items) => list.value = items);
}

async function updateItem(name) {
    const updatedItem = {
      name
    }

    const item = await updateListItem(updatedItem, edit.value);

    if (!item) {
      alert("There was a database error, try again!");
      return;
    }

    refresh();

    edit.value = -1;
}

async function checkItem(id, checked) {
    const updatedItem = {
      checked: !checked
    }

    const item = await updateListItem(updatedItem, id);

    if (!item) {
      alert("There was a database error, try again!");
      return;
    }

    refresh();

    edit.value = -1;
}

async function trashItem(id) {
    const updatedItem = {
      trashed: true,
      trash_time: new Date()
    }

    const item = await updateListItem(updatedItem, id);

    if (!item) {
      alert("There was a database error, try again!");
      return;
    }

    refresh();
}

async function restoreItem(id) {
    const updatedItem = {
      trashed: false,
      trash_time: null
    }

    const item = await updateListItem(updatedItem, id);

    if (!item) {
      alert("There was a database error, try again!");
      return;
    }

    refresh();
}

async function deleteItem(id) {
  const destroyedItem = await deleteListItem(id);

  if (!destroyedItem) {
    alert("There was a database error, try again!");
    return;
  }

  refresh();
}
