<template>
    <div class="h-screen bg-grey-lighten-1 d-flex justify-center align-center">
        <v-form @submit.prevent="reset" class="form d-flex flex-column align-center rounded-lg w-40 px-8 py-10">
            <div class="d-flex text-center flex-column align-center justify-center">
                <v-icon icon="mdi-shield-lock" class="logo mb-4 text-red-accent-2"></v-icon>
                <h2>Reset a new password</h2>
                <span>Please create a new password for <span class="text-red-accent-2">{{ $route.params.email
                }}</span>.</span>
            </div>
            <div class="w-100 mt-4">
                <v-text-field class="text-black" v-model="passwords.password"
                    :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" :type="showPassword ? 'text' : 'password'"
                    density="compact" placeholder="New password" prepend-inner-icon="mdi-lock-outline" variant="outlined"
                    @click:append-inner="showPassword = !showPassword"
                    :error-messages="v$.password.$errors.map((e) => e.$message)" @input="v$.password.$touch"
                    @blur="v$.password.$touch"></v-text-field>
                <v-text-field class="text-black mt-2" v-model="passwords.confirmPassword"
                    :append-inner-icon="showConfirm ? 'mdi-eye-off' : 'mdi-eye'" :type="showConfirm ? 'text' : 'password'"
                    density="compact" placeholder="Confirm password" prepend-inner-icon="mdi-lock-check-outline"
                    variant="outlined" @click:append-inner="showConfirm = !showConfirm" :rules="[passwordConfirmationRule]"
                    :error-messages="v$.confirmPassword.$errors.map((e) => e.$message)" @input="v$.confirmPassword.$touch"
                    @blur="v$.confirmPassword.$touch"></v-text-field>
            </div>
            <primary-button @click="v$.$touch()" class="mt-2" block size="large" type="medium">
                <v-icon icon="mdi-lock-reset" class="mr-2"></v-icon>
                RESET
            </primary-button>
        </v-form>
    </div>

    <!-- Alert success -->
    <base-alert v-model="success">
        <v-icon class="mr-2 text-h4 mdi mdi-check-circle"></v-icon>
        <h6 class="mt-2">Reset a new password is successfully.</h6>
    </base-alert>

    <!-- Alert fail -->
    <base-alert v-model="fail">
        <v-icon class="mr-2 text-h4 mdi mdi-check-circle"></v-icon>
        <h6 class="mt-2">Couldn't found your reset password link.</h6>
    </base-alert>
</template>

<script setup>
import http from "../http-common";
import { useRouter } from "vue-router";
import { defineProps, onBeforeMount, reactive, ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from '@vuelidate/validators';
// Variables
const router = useRouter();
const props = defineProps(['token', 'email']);
const success = ref(false);
const fail = ref(false);
const showPassword = ref(false);
const showConfirm = ref(false);
const initialsPassword = {
    password: "",
    confirmPassword: ""
};
const passwords = reactive({
    ...initialsPassword
});
const rules = {
    password: { required, minLength: minLength(8) },
    confirmPassword: { required }
};
const v$ = useVuelidate(rules, passwords);
// Validation confirm password 
const passwordConfirmationRule = () => {
    if (passwords.password !== passwords.confirmPassword) {
        return 'Confirm password must be match.'
    } else {
        return true;
    }
};

// Method
const reset = async () => {
    if (v$.value.$errors.length === 0 && passwordConfirmationRule() === true) {
        let resetData = {
            email: props.email,
            token: props.token,
            new_password: passwords.password
        };
        try {
            const res = await http.post("/recover_password/reset", resetData);
            if (res.data.success) {
                success.value = true;
                setTimeout(() => {
                    router.push('/login');
                }, 1800);
            }
        } catch (err) {
            return err;
        }
    }
};
// Lifecycle hook
onBeforeMount(async () => {
    let resetData = {
        email: props.email,
        token: props.token
    };
    // Check email and token reset password in database
    try {
        await http.post("/recover_password/check", resetData);
    } catch (err) {
        if (!err.response.data.success) {
            fail.value = true;
            setTimeout(() => {
                router.push('/login');
            }, 1800);
        }
    }
})
</script>

<style scoped>
.w-40 {
    width: 40%;
}
.logo {
  font-size: 10rem;
}
.cursor {
    cursor: pointer;
}

@media screen and (max-width: 900px) {
    .form {
        width: 60%;
    }
}

@media screen and (max-width: 430px) {
    .form {
        width: 100%;
    }
}
</style>