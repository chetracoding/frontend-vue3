<template>
  <v-sheet class="w-auto bg-grey-darken-2 rounded-lg p-2">
    <v-card class="p-4 bg-grey-darken-3 rounded-lg">
      <h6 class="font-weight-bold mt-1 text-center">{{ category.name }}</h6>
    </v-card>

    <slot></slot>
  </v-sheet>
</template>

<script setup>
import { defineProps } from "vue";
defineProps(["category"]);
</script>

