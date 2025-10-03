<script setup>
    import { signUpNewUser } from '@/database/database-control';
    import { computed, ref } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const emailAddress = ref("");
    const validEmail = computed(() => {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        return emailRegex.test(emailAddress.value);
    })

    const password = ref("");
    const confirmedPassword = ref("");
    const passwordVisible = ref(false);

    const passwordInput = computed(() => passwordVisible.value ? "text" : "password");

    const error = ref("")

    async function submit() {
        if (password.value !== confirmedPassword.value || !validEmail.value) return; //Just to be safe
        let success = await signUpNewUser(emailAddress.value, password.value);

        if (!success) error.value = 'Something went wrong! Please try again';
        else router.push('list')
    }
</script>

<template>
    <header>
        <button class="back" @click="router.back()">&lt;</button>
        <h1>Sign Up!</h1>
    </header>
    <form @submit.prevent="submit">
        <label for="email-address">Email:</label><input id="email-address" type="email" v-model="emailAddress" />
        <p v-if="!validEmail">Make sure email is valid!</p>
        <br />
        <label for="password-main">Password:</label><input id="password-main" :type="passwordInput" v-model="password" />
        <br />
        <label for="password-confirm">Confirm Password:</label><input id="password-confirm" :type="passwordInput" v-model="confirmedPassword" />
        <br />
        <input @click="passwordVisible = !passwordVisible" type="checkbox" :value="passwordVisible">View Password</input>
        <p v-if="password !== confirmedPassword">Passwords don't match</p>
        <br />
        <button type="submit" :disabled="!validEmail || (password !== confirmedPassword)">Sign Up</button>
        <p v-if="error !== ''">{{ error }}</p>
    </form>
</template>

<style scoped>
    header {
    height: 20%;
    width: 100%;
    display: flex;
    align-items: center;

    background-color: lightseagreen;
  }

  h1 {
    margin-left: 5px;
    margin-right: auto;
  }

  .back {
    height: 200px;
    width: 200px;
    font-size:xx-large;
    background-color: inherit;
  }
</style>