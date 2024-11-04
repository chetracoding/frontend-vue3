<template>
  <v-form>
    <v-dialog v-model="dialog" persistent width="900">
      <v-card class="rounded-lg">
        <v-card-title v-if="productInForm.product_id" class="bg-red-accent-2 text-center">Update
          product</v-card-title>
        <v-card-title v-else class="bg-red-accent-2 text-center">Create new product</v-card-title>

        <div class="w-100 px-2 pt-2 d-flex">
          <div class="w-30 mr-3">
            <v-text-field v-model="productInForm.name" required class="mt-2 text-black" variant="outlined"
              density="compact" label="Name" :error-messages="vp$.name.$errors.map((e) => e.$message)"
              @input="vp$.name.$touch" @blur="vp$.name.$touch"></v-text-field>

            <v-text-field v-model="productInForm.product_code" required class="mt-2 text-black" variant="outlined"
              density="compact" label="Code"
              :error-messages="`${vp$.product_code.$errors.map((e) => e.$message)}${errProductCode}`"
              @input="vp$.product_code.$touch; errProductCode = '';" @blur="vp$.product_code.$touch"></v-text-field>

            <v-select v-model="productInForm.category_id" required class="mt-2 text-black" variant="outlined"
              label="Category" :items="categories" :item-title="'name'" :item-value="'category_id'" density="compact"
              :error-messages="vp$.category_id.$errors.map((e) => e.$message)" @change="vp$.category_id.$touch"
              @blur="vp$.category_id.$touch">
            </v-select>

            <v-textarea v-model="productInForm.description" required class="mt-2 text-black" variant="outlined" cols="2"
              density="compact" label="Description" rows="1"
              :error-messages="vp$.description.$errors.map((e) => e.$message)" @input="vp$.description.$touch"
              @blur="vp$.description.$touch"></v-textarea>

            <v-switch v-model="productInForm.is_active" class="text-black" variant="outlined" required
              color="orange-darken-4" label="Active" :error-messages="vp$.is_active.$errors.map((e) => e.$message)"
              @change="vp$.is_active.$touch" @blur="vp$.is_active.$touch"></v-switch>
          </div>

          <div class="w-30">
            <v-file-input ref="inputFile" required accept="image/png, image/jpeg" :clearable="false" density="compact"
              label="File input" class="d-none" variant="outlined" prepend-icon="mdi-file-image"
              @change="imageUpload($event);"></v-file-input>

            <v-tooltip v-model="showToolTip" location="center">
              <template v-slot:activator="{ props }">
                <v-img v-bind="props" @click="uploadClicked"
                  :src="(productInForm.image) ? productInForm.image : (imgPreview) ? imgPreview : require('../../assets/select_product.png')"
                  :width="238" :height="193" class="cursor mt-2 rounded-lg" aspect-ratio="16/9" cover></v-img>
              </template>
              <div class="d-flex flex-column py-2 align-center">
                <v-icon class="text-h4" color="white" icon="mdi-image-plus"></v-icon>
                <span>Upload image</span>
              </div>
            </v-tooltip>
          </div>

          <div class="ml-3 mb-2 w-50">
            <div class="d-flex align-center gap-2">
              <v-text-field v-model="customize.size" class="mt-2 text-black w-50" variant="outlined" density="compact"
                label="Size" :error-messages="vc$.size.$errors.map((e) => e.$message)" @input="vc$.size.$touch"
                @blur="vc$.size.$touch"></v-text-field>

              <v-text-field v-model="customize.price" class="mt-2 text-black w-50" variant="outlined" density="compact"
                label="Price ($)" type="number" :error-messages="vc$.price.$errors.map((e) => e.$message)"
                @input="vc$.price.$touch" @blur="vc$.price.$touch"></v-text-field>

              <primary-button @click="vc$.$validate(); storeCustom(findCustIndex)" class="mb-3">
                <v-icon icon="mdi-content-save-all" color="white" size="large"></v-icon>
                Save
              </primary-button>
            </div>

            <div v-for="(customize, index) in productInForm.product_customizes" :key="index"
              class="d-flex mt-2 p-2 rounded-lg justify-space-between align-center bg-grey-darken-1 mb-2" width="300px">
              <div class="w-25">
                <span>{{ customize.size }}</span>
              </div>
              <div class="w-40">
                <span>${{ Number(customize.price).toFixed(2) }}</span>
              </div>
              <div class="w-40 d-flex justify-end">
                <dark-button @click="editCustom(index)">
                  <v-icon icon="mdi-square-edit-outline" color="white" size="large"></v-icon>
                  Edit
                </dark-button>
                <danger-button @click="isDelete = true; deleteCustIndex = index;" class="ml-2">
                  <v-icon icon="mdi-delete-forever" color="white" size="large"></v-icon>
                  Delete
                </danger-button>
              </div>
            </div>
          </div>
        </div>

        <v-card-actions class="bg-grey-lighten-2">
          <v-spacer></v-spacer>
          <danger-button @click="clearPruduct()">
            <v-icon icon="mdi-close-box-multiple" color="white" size="large"></v-icon>
            Close
          </danger-button>
          <primary-button @click="vp$.$validate(); save();">
            <v-icon icon="mdi-content-save-all" color="white" size="large"></v-icon>
            Save
          </primary-button>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>

  <base-dialog v-model="isDelete" title="Tips" ms="Are you sure you want to delete?">
    <danger-button @click="isDelete = false">
      <v-icon icon="mdi-close-box-multiple" color="white" size="large"></v-icon>
      Cancel
    </danger-button>
    <primary-button @click="deleteCustom">
      <v-icon icon="mdi-checkbox-multiple-marked" color="white" size="large"></v-icon>
      Confirm
    </primary-button>
  </base-dialog>

  <!-- Create product customize success -->
  <base-alert v-model="createSuccess">
    <v-icon class="mr-2 text-h4 mdi mdi-check-circle"></v-icon>
    <h5 class="mt-2">Created customize succeefully!</h5>
  </base-alert>

  <!-- Update product customize success -->
  <base-alert v-model="updateSuccess">
    <v-icon class="mr-2 text-h4 mdi mdi-check-circle"></v-icon>
    <h5 class="mt-2">Updated customize succeefully!</h5>
  </base-alert>

  <!-- Delete product customize success -->
  <base-alert v-model="deleteSuccess">
    <v-icon class="mr-2 text-h4 mdi mdi-check-circle"></v-icon>
    <h5 class="mt-2">Deleted customize succeefully!</h5>
  </base-alert>

  <!-- Alert select image -->
  <base-alert v-model="isNoImage">
    <v-icon class="mr-2 text-h4 mdi mdi-close-circle"></v-icon>
    <h5 class="mt-2">Please upload image!</h5>
  </base-alert>

  <!-- Uploading progress -->
  <uploading-progress v-model="showProgress" :uploadValue="uploadValue"></uploading-progress>
</template>

<script setup>
// Import
import http from '@/http-common';
// import firebase from "firebase";
import { onMounted, ref } from "vue";
import { useProductStore } from "@/stores/product";
import { useCategoryStore } from "@/stores/category";
import { storeToRefs } from "pinia";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

// Variables
const { storeProduct, updateProduct, resetProductForm } = useProductStore();
const { dialog, productInForm, errProductCode } = storeToRefs(useProductStore());
const { getCategory } = useCategoryStore();
const { categories } = storeToRefs(useCategoryStore());
const showToolTip = ref(false);
const imgPreview = ref(null);
const showProgress = ref(false);
const uploadValue = ref(0);
const inputFile = ref(null)
const isDelete = ref(false);
const isNoImage = ref(false);
const deleteCustIndex = ref(null);
const createSuccess = ref(false);
const updateSuccess = ref(false);
const deleteSuccess = ref(false);

// Validation product
const vp$ = useVuelidate(
  {
    name: { required },
    product_code: { required },
    category_id: { required },
    description: { required },
    is_active: { required },
  },
  productInForm
);
// Clear product form
const clearPruduct = () => {
  productInForm.value.product_customizes = [];
  clearCustomize();
  errProductCode.value = "";
  imgPreview.value = null;
  resetProductForm();
  vp$.value.$reset();
  dialog.value = false;
};

// Validation product customize
const findCustIndex = ref(null);
const initialCustomize = {
  size: null,
  price: null,
};
const customize = ref({
  ...initialCustomize
});
const vc$ = useVuelidate(
  {
    size: { required },
    price: { required },
  },
  customize
);

// Clear product customize form
const clearCustomize = () => {
  vc$.value.$reset();
  for (const [key, value] of Object.entries(initialCustomize)) {
    customize.value[key] = value;
  }
};

// Method
// Clicked upload image
const uploadClicked = () => {
  inputFile.value.click();
}

// When upload image
const imageUpload = () => {
  uploadValue.value = 0;
  showProgress.value = true;
  // const file = e.target.files[0];
  // if (file) {
  //   // Reference: https://medium.com/@choolakejay/upload-images-to-firebase-storage-with-vue-js-afb914566d9
  //   // Upload image to firebase storage
  //   const storageRef = firebase
  //     .storage()
  //     .ref(`${file.name}`)
  //     .put(file);
  //   storageRef.on(
  //     `state_changed`,
  //     (snapshot) => {
  //       uploadValue.value = parseInt((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
  //     },
  //     (error) => {
  //       console.log(error.message);
  //     },
  //     () => {
  //       storageRef.snapshot.ref.getDownloadURL().then((url) => {
  //         showProgress.value = false;
  //         uploadValue.value = 100;
  //         productInForm.value.image = url;
  //         imgPreview.value = url;
  //       });
  //     }
  //   );
  // }
};

// Add product customize
const storeCustom = (custIndex) => {
  if (vc$.value.$errors.length === 0) {
    // Update customize
    if (custIndex !== null) {
      productInForm.value.product_customizes[custIndex].size = customize.value.size;
      productInForm.value.product_customizes[custIndex].price = customize.value.price;
      clearCustomize();
      updateSuccess.value = true;
    } else {
      // Create customize
      productInForm.value.product_customizes.push({ ...customize.value });
      clearCustomize();
      createSuccess.value = true;
    }
    findCustIndex.value = null;
  }
};
// Delete product customize
const deleteCustom = () => {
  let productCustomizeId = productInForm.value.product_customizes[deleteCustIndex.value].product_customize_id;
  if (productCustomizeId) {
    try {
      http.delete(`product_customizes/${productCustomizeId}`);
    } catch (err) {
      console.log(err);
    }
  }
  productInForm.value.product_customizes.splice(deleteCustIndex.value, 1);
  deleteSuccess.value = true;
  isDelete.value = false;
};
// Edit product customize
const editCustom = (index) => {
  findCustIndex.value = index;
  customize.value.size = productInForm.value.product_customizes[index].size;
  customize.value.price = productInForm.value.product_customizes[index].price;
};

// Save the product
const save = async () => {
  // Check customize
  if (productInForm.value.product_customizes.length === 0) {
    vc$.value.$touch();
  }
  if (vp$.value.$errors.length === 0 && productInForm.value.product_customizes.length > 0) {
    if (!productInForm.value.image) {
      isNoImage.value = true;
    } else {
      // Check the product id
      if (productInForm.value.product_id) {
        // Update the product
        await updateProduct(productInForm.value);
      } else {
        // Create a new product
        await storeProduct(productInForm.value);
      }
      // Check the product code message
      if (!errProductCode.value) {
        dialog.value = false;
        clearCustomize();
        clearPruduct();
      }
    }
  }
};

// Lifecycle hook
onMounted(() => {
  getCategory();
});
</script>

<style scoped>
.w-30 {
  width: 30%;
}

.cursor {
  cursor: pointer;
}

.w-40 {
  width: 30%;
}
</style>