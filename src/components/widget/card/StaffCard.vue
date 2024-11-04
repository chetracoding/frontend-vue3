<template>
  <!--Card-->
  <v-card
    class="d-flex justify-space-between align-center pa-2 ma-2 bg-grey-darken-2 rounded-lg"
  >
    <span class="w-15 ml-2">{{ user.first_name }}</span>
    <span class="w-15">{{ user.last_name }}</span>
    <span class="w-10">{{ user.gender }}</span>
    <span class="w-25">{{ user.email }}</span>
    <span class="text-capitalize w-15 pl-5">{{ user.role.name }}</span>
    <!--Action-->
    <v-card-actions class="w-20 d-flex justify-end">
      <slot></slot>
    </v-card-actions>
  </v-card>
</template>

<script setup>
// Import
import { defineProps } from "vue";

defineProps(["user"]);
</script>

<style scoped>
.card-summary {
  background: #2c2c2c;
}
.w-15 {
  width: 15%;
}
.w-10 {
  width: 10%;
}
.w-20 {
  width: 20%;
}
</style>
