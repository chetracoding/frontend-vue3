<!-- Referemce: https://play.vuetifyjs.com/
<!- Dialog for update profile -->
<template>
  <!-- Form update profile -->
  <v-form>
    <!-- Dialog -->
    <v-dialog v-model="dialog" persistent width="550" no-padding>
      <v-card class="h-auto rounded-lg d-flex flex-column bg-white">
        <!--Card title-->
        <v-card-title class="text-center mb-1 bg-red-accent-2">
          <span class="font-inter text-h6">Update Profile</span>
        </v-card-title>
        <!--Card container-->
        <v-container class="mt-2">
          <v-row class="d-flex px-2 flex-column justify-center gap-2">
            <v-tooltip v-model="showToolTip" location="center">
              <template v-slot:activator="{ props }">
                <v-avatar v-bind="props" size="150" class="profile align-self-center">
                  <v-img v-if="userProfileInForm.image" :src="userProfileInForm.image" alt="user profile"></v-img>
                  <span v-else class="text-h2 text-white">{{ initials }}</span>

                  <input @change="imageUpload($event)" type="file" class="input-image" accept="image/png, image/jpeg" />
                </v-avatar>
              </template>
              <div class="py-2 d-flex flex-column align-center">
                <v-icon class="text-h4" color="white" icon="mdi-camera-image"></v-icon>
                <span>Upload image</span>
              </div>
            </v-tooltip>
            <div class="gap-2 mt-2">
              <div class="input-group gap-2">
                <!--Input first name field-->
                <v-text-field v-model="userProfileInForm.first_name" class="text-black" variant="outlined"
                  label="First name" density="compact" :error-messages="v$.first_name.$errors.map((e) => e.$message)"
                  @blur="v$.first_name.$touch"></v-text-field>
                <!--Input last name field-->
                <v-text-field v-model="userProfileInForm.last_name" class="text-black" label="Last name" density="compact"
                  variant="outlined" :error-messages="v$.last_name.$errors.map((e) => e.$message)"
                  @blur="v$.last_name.$touch"></v-text-field>
              </div>
              <!--Select gender field-->
              <v-select v-model="userProfileInForm.gender" label="Gender" :items="['Male', 'Female', 'Other']"
                density="compact" class="text-black mt-2" variant="outlined"
                :error-messages="v$.gender.$errors.map((e) => e.$message)" @blur="v$.gender.$touch"></v-select>
              <!--Input email field-->
              <v-text-field v-model="userProfileInForm.email" class="mt-1 text-black" label="Email" density="compact"
                variant="outlined" :error-messages="`${v$.email.$errors.map(
                  (e) => e.$message
                )}${errMessage}`" @blur="v$.email.$touch"></v-text-field>
            </div>
          </v-row>
        </v-container>
        <v-card-actions class="bg-grey-lighten-2">
          <v-spacer></v-spacer>
          <!--Close button-->
          <danger-button @click="$emit('closeForm')">
            <v-icon icon="mdi-close-box-multiple" color="white" size="large">
            </v-icon>
            Close
          </danger-button>
          <!--Save button-->
          <primary-button class="mr-1" type="submit" @click="() => {
            v$.$validate();
            save();
          }
            ">
            <v-icon icon="mdi-content-save-all" color="white" size="large">
            </v-icon>
            Save
          </primary-button>
        </v-card-actions>
        <!--Action-->
      </v-card>
    </v-dialog>
  </v-form>

  <!-- Uploading progress -->
  <uploading-progress v-model="showProgress" :uploadValue="uploadValue"></uploading-progress>

  <!-- Alert update success -->
  <base-alert v-model="updateSuccess">
    <v-icon class="mr-2 text-h4 mdi mdi-check-circle"></v-icon>
    <h6 class="mt-2">Updated profile successfully.</h6>
  </base-alert>
</template>

<script setup>
// Import
// import firebase from "firebase";
import { onMounted, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { defineProps, computed, defineEmits } from "vue";
import { useUserStore } from "@/stores/user";
import { useRoleStore } from "@/stores/role";
import { storeToRefs } from "pinia";

// Variables
const { updateProfile } = useUserStore();
const { getRoles } = useRoleStore();
const { userProfileInForm, errMessage, updateSuccess } = storeToRefs(
  useUserStore()
);
const emit = defineEmits(["closeForm"]);
const props = defineProps(["isShowForm", "initials"]);
const showToolTip = ref(false);
const showProgress = ref(false);
const uploadValue = ref(0);

const rules = {
  first_name: { required },
  last_name: { required },
  gender: { required },
  email: { required, email },
};

const v$ = useVuelidate(rules, userProfileInForm);

const save = async () => {
  if (v$.value.$errors.length === 0) {
    await updateProfile(userProfileInForm.value);
    if (!errMessage.value) {
      emit("closeForm");
    }
  }
};

// Computed
let dialog = computed(() => {
  return props.isShowForm;
});

// Method
// When upload image
const imageUpload = () => {
  uploadValue.value = 0;
  showProgress.value = true;
  // const file = e.target.files[0];
  // if (file) {
  //   // Reference: https://medium.com/@choolakejay/upload-images-to-firebase-storage-with-vue-js-afb914566d9
  //   // Upload image to firebase storage
  //   const storageRef = firebase.storage().ref(`${file.name}`).put(file);
  //   storageRef.on(
  //     `state_changed`,
  //     (snapshot) => {
  //       uploadValue.value = parseInt(
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //       );
  //     },
  //     (error) => {
  //       console.log(error.message);
  //     },
  //     () => {
  //       storageRef.snapshot.ref.getDownloadURL().then((url) => {
  //         showProgress.value = false;
  //         uploadValue.value = 100;
  //         userProfileInForm.value.image = url;
  //       });
  //     }
  //   );
  // }
};

// Lifecycle hook
onMounted(async () => {
  getRoles();
});
</script>

<style scoped>
.font-inter {
  font-family: "Inter", sans-serif !important;
}

.profile {
  background: #2c2c2c;
}

.input-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.input-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
</style>