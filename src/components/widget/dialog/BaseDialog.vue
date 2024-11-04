<template>
    <v-dialog transition="dialog-top-transition" width="auto">
        <v-card class="rounded-lg">
            <v-toolbar class="text-h5 text-center pr-4" color="red-accent-2" :title="title"></v-toolbar>
            <div>
                <v-card-text>
                    <div class="font-inter text-center text-h6 pa-5">{{ ms }}</div>
                </v-card-text>
                <v-card-actions class="p-2 bg-grey-lighten-2 justify-space-between">
                    <slot></slot>
                </v-card-actions>
            </div>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { defineProps } from "vue";

// Variable
defineProps(["title", "ms"]);

</script>