// Reference : https://vuetifyjs.com/en/components/tables/

<template>
  <!--Don't have project-->
  <div class="h-screen" v-if="products.length === 0">
    <h4 class="text-center mt-5 text-orange-darken-4">Don't have any product.</h4>
  </div>
  <!-- Create table of list products -->
  <v-table v-else>
    <thead>
      <tr>
        <th class="text-left text-black font-weight-bold">No.</th>
        <th class="text-left text-black font-weight-bold">Name</th>
        <th class="text-left text-black font-weight-bold">Barcode</th>
        <th class="text-left text-black font-weight-bold">Category</th>
        <th class="text-left text-black font-weight-bold">Description</th>
        <th class="text-left text-black font-weight-bold" width="150px">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(product, index) in props.products" :key="product.product_id">
        <td>{{ index + 1 }}</td>
        <td>{{ product.name }}</td>
        <td>{{ product.barcode }}</td>
        <td>{{ product.category.name }}</td>
        <td>{{ product.description }}</td>
        <td>
          <div class="d-flex">
            <div class="d-flex align-center">
              <v-switch @click="activeClicked(product)" v-model="product.is_active" class="mr-3" color="orange-darken-4"
                hide-details="auto"></v-switch>
              <v-icon @click="productInForm = {...product}; dialog = true;" icon="mdi-square-edit-outline" color="blue"
                class="mr-3"></v-icon>
              <v-icon icon="mdi-delete" color="red"></v-icon>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>
  <!-- Close -->
</template>

<script setup>
import { defineProps } from "vue";
import { useProductStore } from "@/stores/product";
import { storeToRefs } from "pinia";

// Variables
const { dialog, productInForm } = storeToRefs(useProductStore());
const props = defineProps(["products"]);

// Method
const { updateProduct } = useProductStore();

const activeClicked = (product) => {
  updateProduct({
    product_id: product.product_id,
    category_id: product.category.category_id,
    name: product.name,
    barcode: product.barcode,
    description: product.description,
    image: product.image,
    is_active: !product.is_active,
    product_customizes: product.product_customizes
  });
}

</script>