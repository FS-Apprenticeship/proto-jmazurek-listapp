import { supabase } from "@/database/supabase-control";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore('user', () => {
    const user = ref(undefined);
    const session = ref(undefined);

    const id = computed(() => user.value?.id)
    const email = computed(() => user.value?.email)

    async function signUpNewUser(email, password) {
        const { data, error } = await supabase.auth.signUp({email, password});  

        if (error !== null) return false;

        user.value = data.user;
        session.value = data.session;

        return true;
    }

    async function signInWithEmail(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({email, password});

        if (error !== null) return false;

        user.value = data.user;
        session.value = data.session;

        return true;
    }

    async function signOut() {
        const { error } = await supabase.auth.signOut(session.access_token);

        if (error !== null) return false;
        user.value = undefined;
        session.value = undefined;

        return true;
    }

    return {
        user,
        session,
        id,
        email,
        signUpNewUser,
        signInWithEmail,
        signOut
    }
})