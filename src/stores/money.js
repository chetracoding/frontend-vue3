import { defineStore } from "pinia";
import http from "../http-common";

export const useMoneyStore = defineStore("money", {
  state: () => {
    return {
      // error: null,
      // success: false,
      moneyReport: [],
    };
  },
  actions: {
    async getMoneyByYear(year) {
      // console.log("hello world" , year);

      try {
        const res = await http.get(`money_report/${year}`);
        if (res.data.success) {
          this.moneyReport = res.data.data;
        }
      } catch (err) {
        return err
      }
    },
  },
});
