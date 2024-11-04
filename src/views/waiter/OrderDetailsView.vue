<template>
    <v-card class="bg-grey-darken-2 py-3 d-flex align-center" width="100%">
        <v-icon @click="$router.push('/waiter')" class="text-h4 ml-5" color="white" icon="mdi-arrow-left"></v-icon>
        <header class="font-inter w-50 ml-7 text-white text-h5 text-right font-weight-bold">Confirm order</header>
    </v-card>

    <div class="d-flex py-4">
        <div class="rounded-lg overflow-hidden d-flex align-center ml-5">
            <div class="p-1 px-2 bg-red-accent-2">Table</div>
            <div v-if="table" class="bg-white p-1 px-2 text-red-accent-2 font-weight-bold">{{ table.table_number
            }}
            </div>
        </div>
    </div>

    <div class="bg-grey-darken-2 pb-5 mb-10">

        <h5 class="ml-5 pt-5 pb-4 font-weight-bold">Order summary</h5>
        <div v-for="customize in myCart" :key="customize.product_customize_id"
            class="mx-4 mb-3 d-flex justify-space-between align-end" style="border-bottom: 1px solid grey;">
            <div>
                <h5>{{ customize.product.name }}</h5>
                <span>Size / {{ customize.size }}</span>
                <h5>x {{ customize.quantity }}</h5>
            </div>
            <h5 class="font-weight-bold">${{ (customize.quantity * customize.price).toFixed(2) }}</h5>
        </div>
    </div>

    <!-- Confim order -->
    <v-layout class="overflow-visible">
        <v-bottom-navigation class="bg-grey-darken-2 rounded-t-lg">
            <div class="d-flex align-center px-3">
                <h5 class="mt-2">Total: <span class="font-weight-bold">${{ totalPrice }}</span></h5>
            </div>

            <v-spacer></v-spacer>

            <primary-button @click="confirm" class="px-3">
                <h6 class="font-weight-bold mt-2">Confirm</h6>
            </primary-button>
        </v-bottom-navigation>
    </v-layout>

    <!-- Alert success -->
    <base-alert v-model="success">
        <v-icon class="mr-2 text-h4 mdi mdi-check-circle"></v-icon>
        <h5 class="mt-2">Ordered succeefully.</h5>
    </base-alert>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useOrderStore } from "@/stores/order";

// Variables
const router = useRouter();
const myCart = localStorage.getItem('customizes_selectd') ? ref(JSON.parse(localStorage.getItem('customizes_selectd'))) : ref([]);
const table = localStorage.getItem('table_selectd') ? ref(JSON.parse(localStorage.getItem('table_selectd'))) : ref(null);
const success = ref(false);
const { storeOrder } = useOrderStore();

const totalPrice = computed(() => {
    let total = 0;
    for (let customize of myCart.value) {
        total += Number(customize.price) * customize.quantity;
    }
    return total.toFixed(2);
})

// Method
const confirm = async () => {
    let customizes = JSON.parse(localStorage.getItem('customizes_selectd'));
    let table = JSON.parse(localStorage.getItem('table_selectd'));
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + ' ' + time;
    let newOrder = {
        table_id: table.table_id,
        datetime: dateTime,
        product_customizes: customizes
    };
    await storeOrder(newOrder);
    success.value = true;
    localStorage.removeItem('customizes_selectd');
    localStorage.removeItem('table_selectd');
    setTimeout(() => {
        router.push('/waiter');
    }, 1200);
}
</script>