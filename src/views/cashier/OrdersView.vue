<template>
  <!-- Order view -->
  <v-layout>
    <base-side-bar :menus="menus"></base-side-bar>
    <!-- Header -->
    <header-component title="Manage order">
      <v-text-field v-model="keyword" @keyup="search" class="search text-white rounded-lg" density="compact"
        variant="solo-none" label="Search for order..." append-inner-icon="mdi-magnify" single-line hide-details
        @click:append-inner="console.log('search')"></v-text-field>
    </header-component>
    <!------>

    <v-main style="height: auto">
      <!-- If no order -->
      <div class="h-screen" v-if="notPaidOrders.length == 0">
        <h4 class="text-center mt-5 text-white">
          Don't have any order.
        </h4>
      </div>
      <!-- If have some orders -->
      <order-list-table v-else :orders="notPaidOrders" />
      <!-- Product Summary -->
      <summary-component class="mt-2" title="Order Summary">
        <template v-slot:content>
          <div class="bg-grey-darken-2 mt-4 py-3 rounded-lg d-flex justify-space-between align-center">
            <span class="ml-2">Total</span>
            <span class="mr-2">{{ notPaidOrders.length }} items</span>
          </div>
        </template>
      </summary-component>
    </v-main>
  </v-layout>
</template>

<script setup>
import { useOrderStore } from "@/stores/order";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { ref } from "vue";
import { defineProps } from "vue";

// Variable
defineProps(["title"]);
const { getOrder, searchOrders } = useOrderStore();
const { notPaidOrders } = storeToRefs(useOrderStore());
const keyword = ref("");
const menus = ref([
  {
    link: "/cashier",
    title: "Order",
    icon: "mdi-storefront-plus",
  },
]);

// Methods
// Search orders
const search = () => {
  if (keyword.value) {
    searchOrders(keyword.value);
  } else {
    getOrder();
  }
}

// Lifecycle hook
onMounted(() => {
  getOrder();
});
</script>

<style>
.search {
  background: #2c2c2c;
}

#onesignal-bell-launcher {
  display: block;
}
</style>
