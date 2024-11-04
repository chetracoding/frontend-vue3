<template>
  <div class="h-screen text-white w-100 d-flex bg-grey-lighten-1">
    <div class="bg-img" />
    <div class="login-form d-flex justify-center align-center">
      <v-form ref="formRef" class="form w-100 px-8 py-10">
        <div class="d-flex justify-center">
          <v-icon
            icon="mdi-shield-account-outline"
            class="logo text-primary"
          />
        </div>
        <div class="mt-4">
          <v-text-field
            class="text-black"
            v-model="credentials.email"
            density="compact"
            placeholder="Email address"
            type="email"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            :rules="[proxy.rulesField.required, proxy.rulesField.email]"
          />
        </div>

        <div>
          <div class="text-medium-emphasis d-flex align-center justify-end">
            <span
              class="text-subtitle-1 cursor text-primary"
              @click="goToResetPwd"
            >
              Forgot password?</span
            >
          </div>
          <v-text-field
            v-model="credentials.password"
            autocomplete
            class="text-black"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            :type="showPassword ? 'text' : 'password'"
            density="compact"
            placeholder="Password"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="showPassword = !showPassword"
            :rules="[proxy.rulesField.required]"
          />
        </div>
        <primary-button class="mt-2" block size="large" @click="connect">
          <v-icon icon="mdi-login-variant" class="mr-2" />
          LOG IN
        </primary-button>
      </v-form>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
import { useCookieStore } from "@/stores/cookie";
import { useRouter } from "vue-router";
import { reactive } from "vue";
import { authStore } from "@/stores";
const { login } = authStore();

// Data
const { proxy, root: $root } = getCurrentInstance();
const cookieStore = useCookieStore();
const router = useRouter();
const showPassword = ref(false);
const formRef = ref(null);
const credentials = reactive({
  email: "",
  password: "",
});

// Method
const goToResetPwd = () => {
  router.push({ name: "RecoverPassword" });
};
const connect = async () => {
  const { valid } = await formRef.value.validate();
  if (!valid) return;

  try {
    const { user, token } = await login(credentials);
    const {
      user_id,
      first_name,
      last_name,
      gender,
      email,
      image,
      store,
      role,
    } = user;
    const data = {
      user_id: user_id,
      first_name: first_name,
      last_name: last_name,
      gender: gender,
      email: email,
      image: image,
      store: store,
    };

    cookieStore.setCookie("user", JSON.stringify(data), 30);
    cookieStore.setCookie("user_token", token, 30);
    cookieStore.setCookie("user_role", role.name, 30);

    if (role.name === "restaurant_owner") {
      return router.push({ name: "OwnerHome" });
    }

    router.push(`/${role.name}`);
  } catch ({ response }) {
    if (response.data && response.data.message) {
      return $root.$alert({
        msg: response.data.message,
        options: { type: "error", timeout: null },
      });
    }

    $root.$alert({
      msg: "Something went wrong while connecting",
      options: { type: "error" },
    });
  }
};
</script>

<style>
.login-form {
  width: 40%;
}

.bg-img {
  width: 60%;
  background-image: url("../assets/pic-fast-food.png");
  background-size: cover;
  filter: brightness(55%);
  background-position: center;
}

.logo {
  font-size: 10rem;
}

.cursor {
  cursor: pointer;
}

@media screen and (max-width: 900px) {
  .bg-img {
    display: none;
  }

  .login-form {
    width: 100%;
  }

  .form {
    width: 60% !important;
  }
}

@media screen and (max-width: 430px) {
  .form {
    width: 100% !important;
  }
}
</style>
