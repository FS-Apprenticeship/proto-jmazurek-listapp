<script setup>
    import { signInWithEmail } from '@/database/database-control';
    import { computed, ref } from 'vue';

    const emailAddress = ref("");
    const validEmail = computed(() => {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        return emailRegex.test(emailAddress.value);
    })

    const password = ref("");
    const passwordVisible = ref(false);

    const passwordInput = computed(() => passwordVisible.value ? "text" : "password");

    const error = ref("")

    const emit = defineEmits(['back','loggedIn'])

    async function submit() {
        if (!validEmail.value) return; //Just to be safe
        let success = await signInWithEmail(emailAddress.value, password.value);

        if (!success) error.value = 'Password or email was incorrect!';
        else emit('loggedIn')
    }
</script>

<template>
    <header>Sign In!</header>
    <button @click="$emit('back')">&lt;</button>
    <form @submit.prevent="submit">
        <label for="email-address">Email:</label><input id="email-address" type="email" v-model="emailAddress" />
        <p v-if="!validEmail">Make sure email is valid!</p>
        <br />
        <label for="password-main">Password:</label><input id="password-main" :type="passwordInput" v-model="password" />
        <br />
        <input @click="passwordVisible = !passwordVisible" type="checkbox" :value="passwordVisible">View Password</input>
        <br />
        <button type="submit" :disabled="!validEmail">Sign In</button>
    </form>
</template>