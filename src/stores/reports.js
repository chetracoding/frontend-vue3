import { defineStore } from "pinia";
import http from "../http-common";

export const useReportsStore = defineStore("reports", {
  state: () => {
    return {
      productReports: [],
      moneyReports: [],
    };
  },
  actions: {
    async getProductReports(month, year) {
      try {
        const res = await http.get(`product_report/${month}/${year}`);
        if (res.data.success) {
          this.productReports = res.data.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getMoneyReports(year) {
      try {
        const res = await http.get(`money_report/${year}`);
        if (res.data.success) {
          this.moneyReports = res.data.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
});
