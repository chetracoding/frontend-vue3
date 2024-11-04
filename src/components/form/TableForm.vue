<template>
  <v-form>
    <v-dialog v-model="dialog" persistent width="400">
      <v-card class="rounded-lg">
        <v-card-title class="text-center bg-red-accent-2">
          <span v-if="tableInForm.table_id" class="text-h6">Update table</span>
          <span v-else class="text-h6">Create new table</span>
        </v-card-title>
        <div>
          <v-col class="mt-2" cols="12">
            <v-text-field
              v-model="tableInForm.table_number"
              required
              class="mt-2 text-black"
              variant="outlined"
              density="compact"
              label="Number"
              :error-messages="`${v$.table_number.$errors.map(
                (e) => e.$message
              )}${errMessage}`"
              @input="
                v$.table_number.$touch;
                errMessage = '';
              "
              @blur="v$.table_number.$touch"
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
              save();"
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
  </v-form>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";
import { useTableStore } from "@/stores/table";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { storeToRefs } from "pinia";

// Variables
const { storeTable ,updateTable, clearForm } = useTableStore();
const { errMessage, tableInForm } = storeToRefs(useTableStore());
const emit = defineEmits(["closeForm"]);
const props = defineProps(["isShowForm"]);

const rules = {
  table_number: { required },
};
const v$ = useVuelidate(rules, tableInForm);

// method
const save = async () => {
  if (tableInForm.value.table_number) {
    if (tableInForm.value.table_id) {
     await updateTable(tableInForm.value);
    } else {
      await storeTable(tableInForm.value);
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
// computed
const dialog = computed(() => {
  return props.isShowForm;
});
</script>