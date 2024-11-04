<template>
  <v-layout>
    <!-- Sidebar -->
    <base-side-bar :menus="menus"></base-side-bar>

    <v-main class="ml-2">
      <header-component title="Manage order" />

      <!-- Main container -->
      <main class="d-flex mt-2">
        <div class="d-flex flex-column" style="width: 100%">
          <div class="d-flex mr-4 justify-end align-center">
            <h6 class="text-white" v-if="orders.length > 1">
              Total {{ orders.length }} items
            </h6>
            <h6 class="text-white mr-3" v-else>
              Total {{ orders.length }} item
            </h6>
          </div>

          <!-- List orders card -->
          <div class="grid-container gap-2 mr-4" v-if="orders.length > 0">
            <chef-order-card v-for="order in orders" :key="order.order_id" :order="order">
            </chef-order-card>
          </div>
          <!-- No order -->
          <div v-else class="h-screen">
            <h4 class="text-center mt-5 text-white">Don't have any order.</h4>
          </div>
        </div>
      </main>
    </v-main>
  </v-layout>

  <!-- Alert message -->
  <base-alert v-model="success">
    <v-icon class="mr-2 text-h4 mdi mdi-check-circle"></v-icon>
    <h5 class="mt-2">Completed order successfully!</h5>
  </base-alert>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useOrderStore } from "@/stores/order";
import { storeToRefs } from "pinia";

// Variables
const { getOrdersNotCompleted } = useOrderStore();
const { orders, success } = storeToRefs(useOrderStore());

const menus = ref([
  {
    link: "/chef",
    title: "Order",
    icon: "mdi-storefront-plus",
  }
]);

setInterval(() => {
  getOrdersNotCompleted();
}, 6000);

// Lifecycle hook
onMounted(() => {
  getOrdersNotCompleted();
});
</script>

<style>
#onesignal-bell-launcher {
  display: block;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}
</style>