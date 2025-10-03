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
  const {data, error} = await supabase.from('items').select('*').eq('user_id', user.id);

  if (error !== null) return false;

  return data;
}

export async function addListItem(item) {
  const { data, error } = await supabase.from('items').insert(item).select();

  if (error !== null) return false;

  return data;
}

export async function updateListItem(item, id) {
  const {data, error} = await supabase.from('items').update(item).eq('user_id', user.id).eq('id', id).select();

  if (error !== null) return false;

  return data;
}

export async function deleteListItem(id) {
  const {data, error} = await supabase.from('items').delete().eq('user_id', user.id).eq('id', id).select();

  if (error !== null) return false;

  return data;
}

export function getID() {
  return user.id;
}

export function getEmail() {
  return user.email;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut(session.access_token);

  if (error !== null) return false;
  user = undefined;

  return true;
}