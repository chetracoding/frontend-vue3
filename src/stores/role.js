import { defineStore } from "pinia";
import http from "../http-common";

export const useRoleStore = defineStore("role", {
  state: () => {
    return {
      roles: []
    };
  },
  actions: {
    async getRoles() {
      try {
        const res = await http.get('roles');
        if (res.data.success) {
          this.roles = res.data.data;
        }
      } catch (err) {
        return err;
      }
    }
  },
});