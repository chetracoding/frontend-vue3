<template>
  <v-navigation-drawer class="rounded-lg bg-grey-darken-2" width="110">
    <div class="d-flex flex-column align-center mt-2"> 
      <v-list-item v-for="item in menus" :key="item" :to="item.link" active-class="active" width="100px" height="80px"
        class="menu-items text-white rounded-lg text-decoration-none">
        <div class="d-flex flex-column align-center" width="'10px'">
          <v-icon :icon="item.icon"></v-icon>
          <span class="font-inter text-subtitle-2">{{ item.title }}</span>
        </div>
      </v-list-item>
    </div>
  </v-navigation-drawer>
</template>

<script setup>
import { defineProps } from "vue";
defineProps(['menus']);
</script>

<style scoped>
.menu-items:hover {
  color: white;
}
.active {
  background: #F25657;
}
.font-inter {
  font-family: 'Inter', sans-serif !important;
}
</style>