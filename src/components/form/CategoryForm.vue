<template>
  <v-dialog v-model="dialog" persistent width="400">
    <v-card class="rounded-lg">
      <v-card-title class="text-center bg-red-accent-2">
        <span v-if="categoryInForm.category_id" class="text-h6"
          >Update category</span
        >
        <span v-else class="text-h6">Create new category</span>
      </v-card-title>
      <div>
        <v-col class="mt-2" cols="12">
          <v-text-field
            v-model="categoryInForm.name"
            required
            class="mt-2 text-black"
            variant="outlined"
            density="compact"
            label="Name"
            :error-messages="`${v$.name.$errors.map(
              (e) => e.$message
            )}${errMessage}`"
            @input="
              v$.name.$touch;
              errMessage = '';
            "
            @blur="v$.name.$touch"
          ></v-text-field>
        </v-col>
        <v-card-actions class="bg-grey-lighten-2 p-2">
          <v-spacer></v-spacer>
          <danger-button @click="close()">
            <v-icon
              icon="mdi-close-box-multiple"
              color="white"
              size="large"
            ></v-icon>

            CLOSE
          </danger-button>
          <primary-button
            @click="
              v$.$validate();
              save();
            "
          >
            <v-icon
              icon="mdi-content-save-all"
              color="white"
              size="large"
            ></v-icon>
            SAVE
          </primary-button>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";
import { useCategoryStore } from "@/stores/category";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { storeToRefs } from "pinia";

// Variables
const { storeCategory, updateCategory, clearForm } = useCategoryStore();
const { categoryInForm, errMessage } = storeToRefs(useCategoryStore());
const emit = defineEmits(["closeForm"]);
const props = defineProps(["isShowForm", "isUpdate"]);

const rules = {
  name: { required },
};
const v$ = useVuelidate(rules, categoryInForm);

// methods
const save = async () => {
  if (categoryInForm.value.name) {
    if (categoryInForm.value.category_id) {
      await updateCategory(categoryInForm.value);
    } else {
      await storeCategory(categoryInForm.value);
    }
    if (!errMessage.value) {
      emit("closeForm");
      close();
    }
  }
};

const close = () => {
  clearForm();
  v$.value.$reset();
  errMessage.value = "";
  emit("closeForm");
};

// Computed
let dialog = computed(() => {
  return props.isShowForm;
});
</script> 