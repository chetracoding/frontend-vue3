<template>
    <!-- Summary -->
    <v-navigation-drawer class="h-auto bg-transparent ml-2 mt-2" location="right" width="285">
        <div class="d-flex mt-1 justify-space-between">
            <h6 class="text-white">{{ title }}</h6>
            <slot name="btn"></slot>
        </div>
        <slot name="content"></slot>
    </v-navigation-drawer>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps(['title']);
</script>