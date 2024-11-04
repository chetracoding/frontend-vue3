<template>
  <div class="h-screen bg-grey-lighten-1 d-flex justify-center align-center">
    <v-form
      @submit.prevent="send"
      class="form d-flex flex-column align-center rounded-lg w-40 px-8 py-10"
    >
      <div class="d-flex flex-column align-center justify-center text-center">
        <v-icon
          icon="mdi-lock-question"
          class="logo mb-4 text-primary"
        ></v-icon>
        <h2>Forgot password</h2>
        <span
          >Enter your <span class="text-primary">email address</span> to send
          link to reset your password.</span
        >
      </div>
      <div class="w-100 mt-4">
        <v-text-field
          class="text-black"
          v-model="credential.email"
          density="compact"
          placeholder="Email"
          type="email"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          :rules="[proxy.rulesField.required, proxy.rulesField.email]"
        />
      </div>
      <primary-button
        :loading="loading"
        @click="v$.$touch()"
        class="mt-2"
        block
        size="large"
        type="medium"
      >
        <v-icon icon="mdi-login-variant" class="mr-2"></v-icon>
        SEND
      </primary-button>
      <span @click="$router.push('/login')" class="mt-3 cursor hover-text-red"
        >Back to login</span
      >
    </v-form>
  </div>

  <!-- Alert success -->
  <base-alert v-model="success">
    <v-icon class="mr-2 text-h4 mdi mdi-check-circle"></v-icon>
    <h6 class="mt-2">Reset password link already send to your email.</h6>
  </base-alert>
</template>

<script setup>
import http from "../http-common";
import { reactive, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { ref } from "vue";

// Data
const { proxy } = getCurrentInstance();
const router = useRouter();
const success = ref(false);
const loading = ref(false);
const errMessage = ref("");
const initialsUser = {
  email: "",
};
const credential = reactive({
  ...initialsUser,
});
const rules = {
  email: { required, email },
};
const v$ = useVuelidate(rules, credential);

// Method
const send = async () => {
  if (v$.value.$errors.length === 0) {
    loading.value = true;
    try {
      const res = await http.post("recover_password", credential);
      if (res.data.success) {
        loading.value = false;
        success.value = true;
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err) {
      loading.value = false;
      if (err.response.data.message.email) {
        errMessage.value = "Invalid email address.";
      } else {
        errMessage.value =
          "Reset password link already send. Please check email.";
      }
    }
  }
};
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
