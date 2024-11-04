<template>
  <v-layout>
    <!-- Left side bar -->
    <res-owner-side-bar></res-owner-side-bar>

    <!-- Main -->
    <v-main>
      <!--Header -->
      <header-component title="Manage staff" />

      <!--List staff card-->
      <div class="mt-3" v-if="staff.length > 0">
        <staff-card v-for="user in staff" :key="user.user_id" :user="user">
          <!--Edit button-->
          <dark-button @click="onEdit(user)">
            <v-icon icon="mdi-square-edit-outline"></v-icon>
            Edit
          </dark-button>
          <!--Delete button-->
          <danger-button @click="onDelete(user.user_id)">
            <v-icon icon="mdi-delete-forever"></v-icon>
            Delete
          </danger-button>
        </staff-card>
      </div>
      <!-- No staff -->
      <div class="h-screen" v-else>
        <h4 class="text-center mt-5 text-white">Don't have any staff.</h4>
      </div>

      <!--Staff summary -->
      <summary-component class="mt-2" title="Staff Summary">
        <template v-slot:btn>
          <secondary-button @click="isShowForm = true">
            <v-icon icon="mdi-plus-box-multiple" color="white" size="large"></v-icon>
            Add More
          </secondary-button>
        </template>
        <template v-slot:content>
          <div class="bg-grey-darken-2 mt-3 py-3 rounded-lg d-flex justify-space-between align-center">
            <span class="ml-2">Total</span>
            <span v-if="staff.length > 1" class="mr-2">{{ staff.length }} people</span>
            <span v-else class="mr-2">{{ staff.length }} person</span>
          </div>
        </template>
      </summary-component>
    </v-main>
  </v-layout>

  <staff-form :isShowForm="isShowForm" @closeForm="closeForm" />

  <!-- Delete dialog -->
  <base-dialog v-model="isDelete" title="Tips" ms="Are you sure you want to delete?">
    <danger-button @click="isDelete = false">
      <v-icon icon="mdi-close-box-multiple" color="white" size="large"></v-icon>
      Cancel
    </danger-button>
    <primary-button @click="
      deleteStaff(findStaffId);
    isDelete = false;
    ">
      <v-icon icon="mdi-checkbox-multiple-marked" color="white" size="large"></v-icon>
      Confirm
    </primary-button>
  </base-dialog>

  <!--Alert delete success-->
  <base-alert v-model="deleteSuccess">
    <v-icon class="mr-2 text-h4 mdi mdi-check-circle"></v-icon>
    <h5 class="mt-2">Deleted staff successfully!</h5>
  </base-alert>
</template>

<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

// Variable
const { getStaff, deleteStaff } = useUserStore();
const { staff, staffInForm, deleteSuccess } = storeToRefs(useUserStore());
const isShowForm = ref(false);
const isDelete = ref(false);
const findStaffId = ref(null);

// Method
// On edit staff
const onEdit = (staff) => {
  isShowForm.value = true;
  staff["role_id"] = staff.role.id;
  staffInForm.value = { ...staff };
};
// On delete staff
const onDelete = (user_id) => {
  findStaffId.value = user_id;
  isDelete.value = true;
};
// Close staff form
const closeForm = () => {
  isShowForm.value = false;
};

// LifeCycle hook
onMounted(() => {
  getStaff();
});
</script>

<style scoped>
.card-summary {
  background: #2c2c2c;
}
</style>