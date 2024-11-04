<template>
  <v-layout>

    <v-main class="ml-2">
      <!-- Left side bar -->
      <res-owner-side-bar></res-owner-side-bar>

      <!-- Header top -->
      <header-component title="Manage product">
        <v-text-field v-model="keyword" @keyup="search" class="search text-white rounded-lg" density="compact"
          variant="solo" label="Search for product..." append-inner-icon="mdi-magnify" single-line
          hide-details></v-text-field>
      </header-component>

      <!-- Main container -->
      <main class="d-flex mt-1 mr-2">
        <div class="d-flex flex-column mr-2 w-100">
          <v-tabs v-model="filterValue" @click="filter" class="text-white mb-3" color="red-accent-2" align-tabs="center">
            <v-tab :value="'all'">All</v-tab>
            <v-tab v-for="category in categories" :key="category.category_id" :value="category.category_id">{{
              category.name }}</v-tab>
          </v-tabs>
          <!-- List products card -->
          <div v-if="products.length > 0" class="grid-container mt-2 gap-2">
            <product-res-owner-card v-for="product in products" :key="product.product_id" :product="product">
              <div class="d-flex justify-space-between align-center mt-2">
                <dark-button @click="onEdit(product)">
                  <v-icon icon="mdi-square-edit-outline" color="white" size="large"></v-icon>
                  Edit
                </dark-button>
                <danger-button @click="
                  isDelete = true;
                deleteId = product.product_id;
                ">
                  <v-icon icon="mdi-delete-forever" color="white" size="large"></v-icon>
                  Delete
                </danger-button>
              </div>
            </product-res-owner-card>
          </div>

          <div class="w-100 text-center" v-else>
            <h4 class="text-center mt-5 text-white">Don't have any product.</h4>
          </div>
        </div>

        <!-- Product Summary -->
        <summary-component class="mt-2" title="Product Summary">
          <template v-slot:btn>
            <secondary-button @click="dialog = true">
              <v-icon icon="mdi-plus-box-multiple" color="white" size="large"></v-icon>
              Add More
            </secondary-button>
          </template>
          <template v-slot:content>
            <div class="bg-grey-darken-2 mt-3 py-3 rounded-lg d-flex justify-space-between align-center">
              <span class="ml-2">Total</span>
              <span v-if="products.length > 1" class="mr-2">{{ products.length }} items</span>
              <span v-else class="mr-2">{{ products.length }} item</span>
            </div>
          </template>
        </summary-component>
      </main>
    </v-main>
  </v-layout>

  <!-- Form create product -->
  <product-form></product-form>

  <!-- Delete product customize -->
  <base-dialog v-model="isDelete" title="Tips" ms="Are you sure you want to delete?">
    <danger-button @click="isDelete = false">
      <v-icon icon="mdi-close-box-multiple" color="white" size="large"></v-icon>
      Cancel
    </danger-button>
    <primary-button @click="deleted">
      <v-icon icon="mdi-checkbox-multiple-marked" color="white" size="large"></v-icon>
      Confirm
    </primary-button>
  </base-dialog>

  <!-- Create new product success -->
  <base-alert v-model="success">
    <v-icon class="mr-2 text-h4 mdi mdi-check-circle"></v-icon>
    <h5 class="mt-2">Created product succeefully!</h5>
  </base-alert>

  <!-- Update the product success -->
  <base-alert v-model="updateSuccess">
    <v-icon class="mr-2 text-h4 mdi mdi-check-circle"></v-icon>
    <h5 class="mt-2">Updated product succeefully!</h5>
  </base-alert>

  <!-- Delete the product success -->
  <base-alert v-model="deleteSuccess">
    <v-icon class="mr-2 text-h4 mdi mdi-check-circle"></v-icon>
    <h5 class="mt-2">Deleted product succeefully!</h5>
  </base-alert>
</template>

<script setup>
// Import
import { debounce } from 'lodash';
import { onMounted } from "vue";
import { useProductStore } from "@/stores/product";
import { useCategoryStore } from "@/stores/category";
import { storeToRefs } from "pinia";
import { ref } from "vue";

// Variables
const { getCategory } = useCategoryStore();
const { getProducts, searchProducts, filterProducts, deleteProduct } = useProductStore();
const {
  products,
  dialog,
  productInForm,
  success,
  updateSuccess,
  deleteSuccess,
} = storeToRefs(useProductStore());
const { categories } = storeToRefs(useCategoryStore());
const isDelete = ref(false);
const deleteId = ref(null);
const keyword = ref("");
const filterValue = ref(null);

// Methods
// Search for products
const search = debounce(function s() {
  if (keyword.value) {
    searchProducts(keyword.value);
  } else {
    getProducts();
  }
}, 600);
// Filter for products
const filter = () => {
  if (filterValue.value === 'all') {
    getProducts();
  } else if (filterValue.value) {
    filterProducts(filterValue.value);
  }
};
// Delete the product
let deleted = async () => {
  await deleteProduct(deleteId.value);
  isDelete.value = false;
};
// On click edit the product
const onEdit = (product) => {
  product.category_id = product.category.category_id;
  productInForm.value = { ...product };
  dialog.value = true;
};

// Lifecycle hook
onMounted(() => {
  getProducts();
  getCategory();
});
</script>

<style scoped>
::v-deep .search .v-input__control .v-theme--light {
  color: white;
  background-color: #2c2c2c !important;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.card-summary {
  background: #2c2c2c;
}
</style>