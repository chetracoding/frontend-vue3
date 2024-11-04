<template>
  <RouterView />
  <BaseAlert ref="alert" />
</template>

<script setup>
import { onMounted, ref, getCurrentInstance } from "vue";
import BaseAlert from "./common/components/BaseAlert.vue";
// import http from "@/http-common";
// import { storeToRefs } from "pinia";
// import { useUserStore } from "@/stores/user";
// import { useOneSignal } from '@onesignal/onesignal-vue3';
onMounted(() => {
  root.root.$alert = alert.value.push;
});
// Variables
const root = getCurrentInstance();
const alert = ref(null);
// const { getUser } = useUserStore();
// const { user } = storeToRefs(useUserStore());
// const oneSignal = useOneSignal();
// Chang site title and icon
// document.title = "Restaurant Management System";
// let favicon = document.querySelector('link[rel="icon"]');
// favicon.setAttribute("href", require("@/assets/logo.png"));

// On subscription change on OneSignal icon
// oneSignal.on('subscriptionChange', async (isSubscribed) => {
//   await getUser();
//   // Only chef and cashier can be get notification from OneSignal
//   if (user.value) {
//     if (isSubscribed && (user.value.role.name === 'chef' || user.value.role.name === 'cashier')) {
//       oneSignal.getUserId(async function (playerId) {
//         try {
//           const res = await http.post("onsignal", {
//             player_id: playerId,
//             user_id: user.value.user_id,
//           });
//           if (res.data.success) {
//             console.log("You have subscribe to notification.");
//           }
//         } catch (err) {
//           console.log(err);
//         }
//       });
//     }
//   }
// });
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400&display=swap");

* {
  padding: 0;
  margin: 0;
  font-family: "Inter", sans-serif !important;
}

body {
  background: #2c2c2c !important;
}

.font-inter {
  font-family: "Inter", sans-serif !important;
}

.active {
  background: #f25657;
}

#onesignal-bell-launcher {
  display: none;
}
</style>
