<template>
  <v-card
    v-if="order.is_completed === 0"
    class="card rounded-lg bg-transparent"
  >
    <div class="bg-grey-darken-2 rounded-lg">
      <v-card-title class="d-flex justify-content-center p-2">
        <v-card-subtitle class="card-subtitle"
          ><v-icon class="mdi mdi-table" style="font-size: 18px"></v-icon>
          :
          {{ order.table_number }}
        </v-card-subtitle>
        <v-card-subtitle
          ><v-icon
            class="mdi mdi-clock-outline"
            style="font-size: 18px"
          ></v-icon>
          <!-- To access only time -->
          :
          {{ new Date(order.datetime).toLocaleTimeString() }}</v-card-subtitle
        >
      </v-card-title>
      <div class="p-2 text-warning">
        <div class="d-flex flex-column gap-2">
          <!-- list foods in order -->
          <div
            class="d-flex justify-content-between bg-grey-darken-3 rounded p-2"
            v-for="order_detail in order.order_details"
            :key="order_detail"
          >
            <div>
              <span style="font-size: 18px"
                >Name :
                {{ order_detail.product_customize.product.name }}</span
              ><br />
              <span style="font-size: 18px"
                >Size: {{ order_detail.product_customize.size }}</span
              >
            </div>
            <span style="font-size: 18px" class="align-self-end"
              >x {{ order_detail.quantity }}</span>
          </div>
        </div>
      </div>
      <v-card-actions class="d-flex justify-content-center">
        <primary-button @click="complete(order)" class="px-2 py-2">
          <v-icon
            icon="mdi-check-circle-outline"
            color="white"
            size="large"
          ></v-icon>
          Complete
        </primary-button>
      </v-card-actions>
    </div>
  </v-card>
</template>
<script setup>
import { defineProps, onMounted } from "vue";
import { useOrderStore } from "@/stores/order";
defineProps(["order"]);

// Variables
const { updateOrdersToCompleted } = useOrderStore();

// Methods
const complete = (order) => {
  const updateCompleteOrder = {
    is_completed: true,
    is_paid: order["is_paid"],
  };
  updateOrdersToCompleted(order.order_id, updateCompleteOrder);
};

// Lifecycle hook
onMounted(() => {
  useOrderStore();
});
</script>

<style scoped>
.card {
  height: 487px;
  overflow: auto;
  width: auto;
}
.card::-webkit-scrollbar {
  display: none;
  background-color: black;
}
.card-subtitle {
  font-size: 18px;
  display: flex;
  align-items: center;
}
</style>