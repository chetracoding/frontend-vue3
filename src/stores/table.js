import { defineStore } from "pinia";
import http from "../http-common";

const initialsTable = {
  table_number: "",
};
export const useTableStore = defineStore("table", {
  state: () => {
    return {
      tableInForm: { ...initialsTable },
      deleteSuccess: false,
      updateSuccess: false,
      createSuccess: false,
      errMessage: "",
      tables: [],
    };
  },
  actions: {
    clearForm() {
      this.tableInForm = { ...initialsTable };
    },
    async getTables() {
      try {
        const res = await http.get("tables");
        if (res.data.success) {
          this.tables = res.data.data;
        }
      } catch (err) {
        return err;
      }
    },
    async storeTable(table) {
      try {
        const res = await http.post("tables", table);
        if (res.data.success) {
          this.createSuccess = true;
          this.getTables();
        }
      } catch (err) {
        if (err.response.data.message) {
          this.errMessage = err.response.data.message.table;
        }
      }
    },
    async deleteTable(id) {
      try {
        const res = await http.delete(`tables/${id}`);
        if (res.data.success) {
          this.deleteSuccess = true;
          this.getTables();
        }
      } catch (err) {
        return err;
      }
    },
    async updateTable(table) {
      try {
        const res = await http.put(`tables/${table.table_id}`, table);
        if (res.data.success) {
          this.updateSuccess = true;
          this.getTables();
        }
      } catch (err) {
        if (err.response.data.message) {
          this.errMessage = err.response.data.message.table;
        }
      }
    },
  },
});
