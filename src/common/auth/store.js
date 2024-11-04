import { defineStore } from "pinia";
import { loginAPI } from "@/api/auth.js";

export const authStore = defineStore("auth", {
  state: () => {
    return {};
  },
  actions: {
    async login({ email, password }) {
      return loginAPI({ email, password });
    },
  },
});
