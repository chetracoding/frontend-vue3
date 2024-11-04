<template>
    <v-snackbar rounded="xg" :timeout="2000" location="top" color="red-accent-2">
        <div class="d-flex text-center justify-center align-center">
            <slot></slot>
        </div>
    </v-snackbar>
</template>