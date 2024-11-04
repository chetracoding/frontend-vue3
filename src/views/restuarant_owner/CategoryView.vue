<template>
  <!-- create alert -->
  <base-alert v-model="createSuccess">
    <v-icon class="mr-2 text-h4 mdi mdi-check-circle"></v-icon>
    <h5 class="mt-2">Created category successfully!</h5>
  </base-alert>

  <!-- update category successfully -->
  <base-alert v-model="updateSuccess">
    <v-icon class="mr-2 text-h4 mdi mdi-check-circle"></v-icon>
    <h5 class="mt-2">Updated category succeefully!</h5>
  </base-alert>

  <!-- delete alert -->
  <base-alert v-model="deleteSuccess">
    <v-icon class="mr-2 text-h4 mdi mdi-check-circle"></v-icon>
    <h5 class="mt-2">Deleted category successfully!</h5>
  </base-alert>

  <v-layout>
    <!-- Left side bar -->
    <res-owner-side-bar></res-owner-side-bar>
    <v-main class="ml-2">
      <header-component title="Manage category">
      </header-component>

      <!-- Main container -->
      <main class="d-flex flex-column mt-2">
        <!-- list category -->
        <div class="grid-container mt-1 mr-2 gap-2" v-if="categories.length > 0">
          <category-card v-for="category in categories" :key="category.category_id" :category="category">
            <div class="d-flex justify-space-between align-center mt-2">
              <!-- close dialo delete category -->
              <dark-button @click="onEdit(category)">
                <v-icon icon="mdi-square-edit-outline" color="white" size="large"></v-icon>
                Edit
              </dark-button>

              <!-- delete category -->
              <danger-button @click="onDelete(category)">
                <v-icon icon="mdi-delete-forever" color="white" size="large"></v-icon>
                Delete
              </danger-button>
            </div>
          </category-card>
        </div>
        <!-- list category empty -->
        <div class="w-100 text-center" v-else>
          <h4 class="text-center mt-5 text-white">Don't have any category.</h4>
        </div>

        <!-- Category Summary -->
        <summary-component class="mt-2" title="Category Summary">
          <template v-slot:btn>
            <secondary-button @click="isShowForm = true">
              <v-icon icon="mdi-plus-box-multiple" color="white" size="large"></v-icon>
              Add More
            </secondary-button>
          </template>
          <template v-slot:content>
            <div class="bg-grey-darken-2 mt-3 py-3 rounded-lg d-flex justify-space-between align-center">
              <span class="ml-2">Total</span>
              <span v-if="categories.length > 1" class="mr-2">{{ categories.length }} items</span>
              <span v-else class="mr-2">{{ categories.length }} item</span>
            </div>
          </template>
        </summary-component>
      </main>
    </v-main>
  </v-layout>

  <!-- form create category -->
  <category-form :isShowForm="isShowForm" @closeForm="closeForm" />

  <!-- dialog delete category -->
  <base-dialog v-model="dialog" title="Tips" ms="Are you sure you want to delete?">
    <danger-button @click="dialog = false">
      <v-icon icon="mdi-close-box-multiple" color="white" size="large"></v-icon>Cancel
    </danger-button>
    <primary-button @click="deleted">
      <v-icon icon="mdi-checkbox-multiple-marked" color="white" size="large"></v-icon>
      Confirm
    </primary-button>
  </base-dialog>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useCategoryStore } from "@/stores/category";
import { storeToRefs } from "pinia";

// Variables
const { getCategory, deleteCategory } = useCategoryStore();
const {
  categoryInForm,
  categories,
  createSuccess,
  updateSuccess,
  deleteSuccess,
} = storeToRefs(useCategoryStore());
const isShowForm = ref(false);
const dialog = ref(false);
const categoryId = ref(null);

//Method

// Delet category
let onDelete = (id) => {
  categoryId.value = id;
  dialog.value = true;
};

const deleted = () => {
  if (categoryId.value !== null) {
    const id = categoryId.value["category_id"];
    deleteCategory(id);
  }
  dialog.value = false;
};

// Edit category
const onEdit = (category) => {
  categoryInForm.value = { ...category };
  isShowForm.value = true;
};

// Methods
const closeForm = () => {
  isShowForm.value = false;
};

// Lifecycle hook
onMounted(() => {
  getCategory();
});
</script>

<style>
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}

.card-summary {
  background: #2c2c2c;
}

.search {
  background: #2c2c2c;
}
</style>