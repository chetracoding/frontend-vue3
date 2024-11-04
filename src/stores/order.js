import { defineStore } from "pinia";
import http from "../http-common";

export const useOrderStore = defineStore("order", {
    state: () => {
        return {
            error: null,
            paidSuccess: false,
            success: false,
            orders: [],
            notPaidOrders: [],
        };
    },
    actions: {
        // Store Order 
        async storeOrder(order) {
            try {
                const res = await http.post('orders', order);
                if (res.data.success) {
                    return res.data.data;
                }
            } catch (err) {
                return err;
            }
        },
        // Get orders not complete
        async getOrdersNotCompleted() {
            try {
                const res = await http.get('orders/completed/0');
                if (res.data.success) {
                    this.orders = res.data.data;
                }
            } catch (err) { return err; }
        },
        // Search orders
        async searchOrders(keyword) {
            try {
                const res = await http.get(`orders/search/${keyword}`);
                if (res.data.success) {
                    this.notPaidOrders = res.data.data;
                }
            } catch (err) {
                if (!err.response.data.success) {
                    this.notPaidOrders = [];
                }
            }
        },
        // Update order to complete
        async updateOrdersToCompleted(orderId, order) {
            try {
                const res = await http.put(`orders/${orderId}`, order);
                if (res.data.success) {
                    this.orders = res.data.data;
                    this.getOrdersNotCompleted();
                    this.success = true;
                }
            } catch (err) { return err; }
        },
        // Get order for cashier
        async getOrder() {
            try {
                const res = await http.get('orders/paid/0');
                if (res.data.success) {
                    this.notPaidOrders = res.data.data
                }
            } catch (err) {
                return err;
            }
        },
        // Update order to paid
        async updateOrdersToPaid(orderId, order) {
            try {
                const res = await http.put(`orders/${orderId}`, order);
                if (res.data.success) {
                    this.orders = res.data.data;
                    this.getOrder();
                    this.paidSuccess = true;
                }
            } catch (err) { return err; }
        },

    },
});