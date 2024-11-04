<template>
  <v-layout>
    <v-main class="h-screen bg-grey-lighten-1 d-flex flex-column align-center main-container">
      <div class="w-100">
        <v-icon @click="comeback" class="back text-h4 text-black ml-5" icon="mdi-keyboard-backspace"></v-icon>
      </div>
      <div class="w-75 card-container m-auto py-15 px-8 rounded-lg bg-grey-darken-2">
        <div class="d-flex image-container ml-10 flex-column justify-center">
          <v-avatar size="200" class="profile align-self-center">
            <v-img v-if="userInfo.image" :src="userInfo.image" :alt="userInfo.first_name"></v-img>
            <span v-else class="text-h2 text-white">{{ initials }}</span>
          </v-avatar>
          <primary-button class="px-2 mt-4 align-self-center" @click="showEditForm">
            <v-icon icon="mdi-square-edit-outline" color="white" size="large"></v-icon>
            Update
          </primary-button>
        </div>
        <div class="w-50 ml-16 overflow-hidden font-size d-flex flex-column info-container">
          <div class="w-100 font-size d-flex">
            <div class="w-50">First name: </div>
            <div class="w-50 text-right-group">{{ userInfo.first_name }}</div>
          </div>
          <div class="w-100 mt-2 d-flex">
            <div class="w-50">Last name: </div>
            <div class="w-50 text-right-group">{{ userInfo.last_name }}</div>
          </div>
          <div class="w-100 mt-2 d-flex">
            <div class="w-50">Gender: </div>
            <div class="w-50 text-right-group">{{ userInfo.gender }}</div>
          </div>
          <div class="w-100 mt-2 d-flex">
            <div class="w-50">Role: </div>
            <div class="w-50 text-capitalize text-right-group">{{ userRole }}</div>
          </div>
          <div class="w-100 mt-2 d-flex">
            <div class="w-50">Email: </div>
            <span class="w-50 text-right-group">{{ userInfo.email }}</span>
          </div>
          <div class="w-100 mt-2 d-flex">
            <div class="w-50">Password: </div>
            <div class="w-50 text-right-group"><span class="cursor text-blue"
                @click="$router.push('/change_password')">Change
                password</span></div>
          </div>
        </div>
      </div>
    </v-main>
  </v-layout>
  <update-profile-form :initials="initials" :isShowForm="isShowForm" @closeForm="closeForm" />
</template>
<script setup>
import { ref } from "vue";
import { useCookieStore } from "@/stores/cookie";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

// Variables
const { clearProfileForm } = useUserStore();
const { getCookie } = useCookieStore();
const { userProfileInForm } = storeToRefs(useUserStore());

const router = useRouter();
const isShowForm = ref(false);
const userInfo = ref(JSON.parse(getCookie("user")));
const userRole = ref(
  getCookie("user_role") === "restaurant_owner"
    ? "restaurant owner"
    : getCookie("user_role")
);
const initials = ref(
  userInfo.value.first_name.slice(0, 1).toUpperCase() +
  userInfo.value.last_name.slice(0, 1).toUpperCase()
);

// Method
const comeback = () => {
  if (getCookie("user_role") === "restaurant_owner") {
    router.push("/");
  } else {
    router.push(`/${getCookie("user_role")}`);
  }
};
const showEditForm = async () => {
  userProfileInForm.value = userInfo.value;
  isShowForm.value = true;
};

// Close update profile form
const closeForm = () => {
  isShowForm.value = false;
  clearProfileForm();
  userInfo.value = JSON.parse(getCookie("user"));
  initials.value =
    userInfo.value.first_name.slice(0, 1).toUpperCase() +
    userInfo.value.last_name.slice(0, 1).toUpperCase();
};
</script>

<style scoped>
.profile {
  background: #2c2c2c;
}

.content-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.font-size {
  font-size: 1.1rem;
}

.card-container {
  display: flex;
}

.cursor {
  cursor: pointer;
}

@media screen and (max-width: 900px) {
  .text-right-group {
    width: 80% !important;
  }

  .card-container {
    flex-direction: column;
  }

  .image-container {
    margin-left: 0 !important;
  }

  .info-container {
    margin-top: 40px;
    width: 100% !important;
    margin-left: 20px !important;
  }
}

@media screen and (max-width: 430px) {
  .back {
    color: white !important;
  }

  .main-container {
    width: 100% !important;
    background: #616161 !important;
  }

  .card-container {
    padding: 0 !important;
    width: 100% !important;
    background: none !important;
  }

  .info-container {
    width: auto !important;
    margin: 0 !important;
    margin-left: 20px !important;
    margin-top: 30px !important;
    padding: 0 !important;
  }

  .text-right-group {
    width: 100% !important;
    margin-right: 20px !important;
  }
}
</style>