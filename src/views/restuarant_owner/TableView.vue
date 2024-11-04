<template>
  <!-- create alet -->
  <base-alert v-model="createSuccess">
    <v-icon class="mr-2 text-h4 mdi mdi-check-circle"></v-icon>
    <h5 class="mt-2">Created table successfully!</h5>
  </base-alert>

  <!-- update table successfully -->
  <base-alert v-model="updateSuccess">
    <v-icon class="mr-2 text-h4 mdi mdi-check-circle"></v-icon>
    <h5 class="mt-2">Updated table succeefully!</h5>
  </base-alert>

  <!-- delete alert -->
  <base-alert v-model="deleteSuccess">
    <v-icon class="mr-2 text-h4 mdi mdi-check-circle"></v-icon>
    <h5 class="mt-2">Deleted table successfully!</h5>
  </base-alert>

  <v-layout>
    <!-- Left side bar -->
    <res-owner-side-bar></res-owner-side-bar>
    <v-main class="ml-2">
      <header-component title="Manage table">
      </header-component>

      <!-- Main container -->
      <main class="d-flex flex-column mt-1 mr-2">
        <!-- list table -->
        <div class="grid-container mt-2 gap-2" v-if="tables.length > 0">
          <table-card v-for="table in tables" :key="table.table_id" :table="table">
            <div class="d-flex justify-space-between align-center mt-2">
              <!-- close dialo delete table -->
              <dark-button @click="onEdit(table)">
                <v-icon icon="mdi-square-edit-outline" color="white" size="large"></v-icon>
                Edit
              </dark-button>
              <danger-button @click="onDelete(table)">
                <v-icon icon="mdi-delete-forever" color="white" size="large"></v-icon>
                Delete
              </danger-button>
            </div>
          </table-card>
        </div>

        <!-- list table empty -->
        <div class="h-screen" v-else>
          <h4 class="text-center mt-5 text-white">Don't have any table.</h4>
        </div>

        <!-- Table Summary -->
        <summary-component class="mt-2" title="Table Summary">
          <template v-slot:btn>
            <secondary-button @click="isShowForm = true">
              <v-icon icon="mdi-plus-box-multiple" color="white" size="large"></v-icon>
              Add More
            </secondary-button>
          </template>
          <template v-slot:content>
            <div class="bg-grey-darken-2 mt-3 py-3 rounded-lg d-flex justify-space-between align-center">
              <span class="ml-2">Total</span>
              <span v-if="tables.length > 1" class="mr-2">{{ tables.length }} items</span>
              <span v-else class="mr-2">{{ tables.length }} item</span>
            </div>
          </template>
        </summary-component>
      </main>
    </v-main>
    <base-dialog v-model="dialog" title="Tips" ms="Are you sure you want to delete?">
      <danger-button @click="dialog = false" class="justify-end">
        <v-icon icon="mdi-close-box-multiple" color="white" size="large"></v-icon>
        Cancel
      </danger-button>
      <primary-button @click="deleted">
        <v-icon icon="mdi-checkbox-multiple-marked" color="white" size="large"></v-icon>
        Confirm
      </primary-button>
    </base-dialog>
  </v-layout>

  <!-- form create table -->
  <table-form :isShowForm="isShowForm" @closeForm="closeForm" />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useTableStore } from "@/stores/table";
import { storeToRefs } from "pinia";

// Variables
const isShowForm = ref(false);
const { getTables, deleteTable } = useTableStore();
const { tables, tableInForm, createSuccess, updateSuccess, deleteSuccess } =
  storeToRefs(useTableStore());
const tableId = ref(null);
const dialog = ref(false);

// methods
const onDelete = (id) => {
  tableId.value = id;
  dialog.value = true;
};
const deleted = () => {
  if (tableId.value != null) {
    const id = tableId.value["table_id"];
    deleteTable(id);
  }
  dialog.value = false;
};

const onEdit = (table) => {
  tableInForm.value = { ...table };
  isShowForm.value = true;
};

const closeForm = () => {
  isShowForm.value = false;
};

// Lifecycle hook
onMounted(() => {
  getTables();
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