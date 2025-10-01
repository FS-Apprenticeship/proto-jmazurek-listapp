const genericDatabase = [{name: "Idea!", crossedOff: false, trashed: false, userID: 0}];
const users = [];

let user, session;

export async function signUpNewUser(email, password) {
  users.sort((a, b) => a.id - b.id);

  let previousID = -1;

  const newUser = {
    id: users.findIndex(user => {
      return user.id === ++previousID;
    }) + 1,
    email,
    password //Obviously evil!
  }
  
  console.log(newUser);

  users.push(newUser);

  user = newUser;

  return true;
}

export async function signInWithEmail(email, password) {
  let userToLogin = users.find(user => user.email === email);

  if (userToLogin === undefined) return false;
  if (userToLogin.password !== password) return false;

  user = userToLogin;

  return true;
}

export async function getListItems() {
  console.log("prepare wait");
  await new Promise((r) => setTimeout(r, 1000));
  console.log("returning");
  return genericDatabase.filter(item => item.userID === user.id);
}

export async function addListItem(item) {
  genericDatabase.push({...item, userID: user.id});
}

export async function updateListItem(itemUpdate) {
  const databaseIndex = genericDatabase.findIndex(item => item.id === itemUpdate.id && item.userID === user.id);

  if (databaseIndex === -1) return false;

  genericDatabase[databaseIndex] = itemUpdate;

  return getListItems();
}

export async function deleteListItem(itemToDelete) {
  const databaseIndex = genericDatabase.findIndex(item => item.id === itemToDelete.id && item.userID === user.id);

  if (databaseIndex === -1) return false;

  genericDatabase.splice(databaseIndex, 1);

  return getListItems();
}

export function getEmail() {
  return user.email;
}

export async function signOut() {
  user = undefined;
}