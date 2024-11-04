<template>
    <v-sheet class="bg-grey-darken-2 rounded-lg p-2 w-auto">
        <v-img class="rounded-lg" height="120" :src="product.image" cover>
        </v-img>

        <h6 class="font-weight-bold mt-1">{{ product.name }}</h6>
        <v-row>
            <v-col cols="6">
                {{ product.product_code }}
            </v-col>

            <v-col v-if="product.product_customizes.length > 1" cols="6" class="text-right">
                {{ product.product_customizes.length }} sizes
            </v-col>
            <v-col v-else cols="6" class="text-right">
                {{ product.product_customizes.length }} size
            </v-col>
        </v-row>
        <slot></slot>
    </v-sheet>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps(['product']);
</script>