<template>
  <v-layout>
    <!-- Left side bar -->
    <res-owner-side-bar></res-owner-side-bar>

    <header-component title="Home" />

    <v-main class="grid-container mx-2 mt-2 gap-2">
      <div class="bg-grey-darken-2 rounded-lg d-flex justify-space-between align-center">
        <div class="w-50 d-flex flex-column align-center  card-summary py-2 m-2 rounded-lg text-center">
          <v-icon icon="mdi-cube-outline" color="white" size="x-large"></v-icon>
          <span class="mt-1">Product</span>
        </div>
        <div class="w-50 d-flex justify-center">
          <h5 v-if="products.length > 1" class="mt-2">{{ products.length }} items</h5>
          <h5 v-else class="mt-2">{{ products.length }} item</h5>
        </div>
      </div>
      <div class="bg-grey-darken-2 rounded-lg d-flex justify-space-between align-center">
        <div class="w-50 d-flex flex-column align-center  card-summary py-2 m-2 rounded-lg text-center">
          <v-icon icon="mdi-shape-plus-outline" color="white" size="x-large"></v-icon>
          <span class="mt-1">Category</span>
        </div>
        <div class="w-50 d-flex justify-center">
          <h5 v-if="categories.length > 1" class="mt-2">{{ categories.length }} items</h5>
          <h5 v-else class="mt-2">{{ categories.length }} item</h5>
        </div>
      </div>
      <div class="bg-grey-darken-2 rounded-lg d-flex justify-space-between align-center">
        <div class="w-50 d-flex flex-column align-center  card-summary py-2 m-2 rounded-lg text-center">
          <v-icon icon="mdi-table-chair" color="white" size="x-large"></v-icon>
          <span class="mt-1">Table</span>
        </div>
        <div class="w-50 d-flex justify-center">
          <h5 v-if="tables.length > 1" class="mt-2">{{ tables.length }} items</h5>
          <h5 v-else class="mt-2">{{ tables.length }} item</h5>
        </div>
      </div>
      <div class="bg-grey-darken-2 rounded-lg d-flex justify-space-between align-center">
        <div class="w-50 d-flex flex-column align-center  card-summary py-2 m-2 rounded-lg text-center">
          <v-icon icon="mdi-account-group-outline" color="white" size="x-large"></v-icon>
          <span class="mt-1">Staff</span>
        </div>
        <div class="w-50 d-flex justify-center">
          <h5 v-if="staff.length > 1" class="mt-2">{{ staff.length }} people</h5>
          <h5 v-else class="mt-2">{{ staff.length }} person</h5>
        </div>
      </div>

    </v-main>
  </v-layout>
</template>

<script setup>
import { useProductStore } from "@/stores/product";
import { useCategoryStore } from "@/stores/category";
import { useTableStore } from "@/stores/table";
import { useUserStore } from "@/stores/user";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

const { getProducts } = useProductStore();
const { getCategory } = useCategoryStore();
const { getTables } = useTableStore();
const { getStaff } = useUserStore();

const { products } = storeToRefs(useProductStore());
const { categories } = storeToRefs(useCategoryStore());
const { tables } = storeToRefs(useTableStore());
const { staff } = storeToRefs(useUserStore());

onMounted(() => {
  getProducts();
  getCategory();
  getTables();
  getStaff();
});
</script>

<style scoped>
.card-summary {
  background: #2c2c2c;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>