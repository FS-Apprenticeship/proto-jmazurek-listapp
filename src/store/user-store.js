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

export function getID() {
  if (user === undefined) return undefined
  return user.id;
}

export function getEmail() {
  if (user === undefined) return undefined
  return user.email;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut(session.access_token);

  if (error !== null) return false;
  user = undefined;

  return true;
}