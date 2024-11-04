import { defineStore } from "pinia";
import http from "../http-common";
import { useCookieStore } from "@/stores/cookie";
const initialsUserProfile = {
  user_id: null,
  first_name: "",
  last_name: "",
  gender: null,
  email: null,
  image: null,
};
const initialsStaff = {
  first_name: "",
  last_name: "",
  gender: null,
  email: null,
  password: null,
  role_id: null,
};
export const useUserStore = defineStore("user", {
  state: () => {
    return {
      staffInForm: { ...initialsStaff },
      userProfileInForm: { ...initialsUserProfile },
      createSuccess: false,
      updateSuccess: false,
      errMessage: '',
      user: null,
      staff: [],
      deleteSuccess: false,
    };
  },
  actions: {
    clearForm() {
      this.staffInForm = { ...initialsStaff };
    },
    clearProfileForm() {
      this.userProfileInForm = { ...initialsUserProfile };
    },
    async getUser() {
      const { getCookie } = useCookieStore();
      try {
        if (getCookie("user_token")) {
          const res = await http.get("user");
          if (res.data.success) {
            this.user = res.data.data;
          }
        }
      } catch (err) {
        this.user = null;
      }
    },

    // List staff
    async getStaff() {
      try {
        const res = await http.get("staff");
        if (res.data.success) {
          this.staff = res.data.data;
        }
      } catch (err) {
        return err;
      }
    },

    // Create staff
    async addStaff(staff) {
      try {
        const res = await http.post("staff", staff);
        if (res.data.success) {
          this.createSuccess = true;
          this.errMessage = '';
          this.getStaff();
        }
      } catch (err) {
        if (err.response.data.message.email) {
          this.errMessage = 'The email has already been taken.';
        }
      }
    },
    // Update staff
    async updateStaff(staff) {
      try {
        const res = await http.put(`staff/${staff.user_id}`, staff);
        if (res.data.success) {
          this.updateSuccess = true;
          this.errMessage = '';
          this.getStaff();
        }
      } catch (err) {
        if (err.response.data.message.email) {
          this.errMessage = 'The email has already been taken.';
        }
      }
    },
    // Update profile
    async updateProfile(userUpdate) {
      const { setCookie } = useCookieStore();
      try {
        const res = await http.put(`update_profile/${userUpdate.user_id}`, userUpdate);
        if (res.data.success) {
          let user = {
            user_id: res.data.data.user_id,
            first_name: res.data.data.first_name,
            last_name: res.data.data.last_name,
            gender: res.data.data.gender,
            email: res.data.data.email,
            image: res.data.data.image,
            store: res.data.data.store,
          };
          setCookie("user", JSON.stringify(user), 30);
          this.updateSuccess = true;
          this.errMessage = '';
        }
      } catch (err) {
        if (err.response.data.message.email) {
          this.errMessage = 'The email has already been taken.';
        }
      }
    },

    // Delete staff
    async deleteStaff(id) {
      try {
        const res = await http.delete(`staff/${id}`);
        if (res.data.success) {
          this.deleteSuccess = true;
          this.getStaff();
        }
      } catch (err) {
        return err;
      }
    },
  },
});
