<script setup>
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

    function submiter() {
        error.value = "";
        if (emailAddress.value === "") {
            error.value = "No email!"
            return; 
        }
    }

</script>

<template>
    <header>Sign In!</header>

    <form @submit.prevent="submiter">
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