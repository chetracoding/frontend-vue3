import { defineStore } from "pinia";
import http from "../http-common";

const initialsCategory = {
  name: "",
};
export const useCategoryStore = defineStore("category", {
  state: () => {
    return {
      categoryInForm: { ...initialsCategory },
      deleteSuccess: false,
      updateSuccess: false,
      createSuccess: false,
      errMessage: "",
      categories: [],
    };
  },
  actions: {
    clearForm() {
      this.categoryInForm = { ...initialsCategory };
    },
    async getCategory() {
      try {
        const res = await http.get("categories");
        if (res.data.success) {
          this.categories = res.data.data;
        }
      } catch (err) {
        return err;
      }
    },
    async storeCategory(category) {
      try {
        const res = await http.post("categories", category);
        if (res.data.success) {
          this.createSuccess = true;
          this.getCategory();
        }
      } catch (err) {
        if (err.response.data.message) {
          this.errMessage = err.response.data.message;
        }
      }
    },
    async deleteCategory(id) {
      try {
        const res = await http.delete(`categories/${id}`);
        if (res.data.success) {
          this.deleteSuccess = true;
          this.getCategory();
        }
      } catch (err) {
        return err;
      }
    },
    async updateCategory(category) {
      try {
        const res = await http.put(
          `categories/${category.category_id}`,
          category
        );
        if (res.data.success) {
          this.updateSuccess = true;
          this.getCategory();
        }
      } catch (err) {
        if (err.response.data.message) {
          this.errMessage = err.response.data.message;
        }
      }
    },
    // async updateCategory(category) {
    //   console.log("Hello world" + category.name);
    //   try {
    //     const res = await http.put(`categories/${category.category_id}`, category);
    //     if (res.data.success) {
    //       this.updateSuccess = true;
    //     }
    //   } catch (err) {
    //     return err;
    //   }
    // }
  },
});
