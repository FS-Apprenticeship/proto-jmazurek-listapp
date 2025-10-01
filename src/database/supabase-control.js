import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

let user, session;

export async function signUpNewUser(email, password) {
  const { data, error } = await supabase.auth.signUp({email, password});

  if (error !== null) return false;

  user = data.user;
  session = data.session;

  return true;
}

export async function signInWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({email, password});

  if (error !== null) return false;

  user = data.user;
  session = data.session;

  return true;
}

export async function getListItems() {

}

export async function addListItem(item) {

}

export async function updateListItem(item) {

}

export async function deleteListItem(item) {

}

export async function getEmail() {
  return user.email;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut(session.access_token);

  if (error !== null) return false;

  return true;
}