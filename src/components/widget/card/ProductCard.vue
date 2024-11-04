<template>
    <v-card class="w-auto p-2 bg-grey-darken-2 rounded-lg" elevation="20">
        <v-img class="rounded-lg" height="130" :src="product.image" cover>
        </v-img>

        <div class="mt-2 d-flex flex-column">
            <span class="font-weight-bold text-grey-lighten-1">{{ product.product_code }}</span>
            <span class="font-inter text-h6 font-weight-bold">{{ product.name }}</span>
            <span class="text-grey-lighten-1">{{ product.description }}</span>
        </div>

        <div class="d-flex mt-1">
            <v-spacer></v-spacer>

            <primary-button @click="$emit('on-customize', product)">Customize</primary-button>
        </div>
    </v-card>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
defineProps(['product']);
defineEmits(['on-customize']);
</script>

<style scoped>
.font-inter {
    font-family: 'Inter', sans-serif !important;
}
</style>