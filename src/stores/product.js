import { defineStore } from "pinia";
import http from "../http-common";

const initialProduct = {
  name: null,
  product_code: null,
  category_id: null,
  description: null,
  is_active: false,
  image: null,
  product_customizes: []
};
export const useProductStore = defineStore("product", {
  state: () => {
    return {
      productInForm: { ...initialProduct },
      dialog: false,
      success: false,
      deleteSuccess: false,
      updateSuccess: false,
      errProductCode: '',
      products: []
    };
  },
  actions: {
    resetProductForm() {
      initialProduct.product_customizes = [];
      this.productInForm = { ...initialProduct };
    },
    async getProducts() {
      try {
        const res = await http.get('products');
        if (res.data.success) {
          this.products = res.data.data;
        }
      } catch (err) {
        return err;
      }
    },
    async searchProducts(keyword) {
      try {
        const res = await http.get(`products/search/${keyword}`);
        if (res.data.success) {
          this.products = res.data.data;
        }
      } catch (err) {
        return err;
      }
    },
    async filterProducts(category_id) {
      try {
        const res = await http.get(`products/filter/${category_id}`);
        if (res.data.success) {
          this.products = res.data.data;
        }
      } catch (err) {
        if (!err.response.data.success) {
          this.products = [];
        }
      }
    },
    async getPopularProducts() {
      try {
        const res = await http.get('popular_products');
        if (res.data.success) {
          this.products = res.data.data;
        }
      } catch (err) {
        if (!err.response.data.success) {
          this.products = [];
        }
      }
    },
    async storeProduct(product) {
      try {
        const res = await http.post('products', product);
        if (res.data.success) {
          this.success = true;
          this.errProductCode = '';
          this.getProducts();
        }
      } catch (err) {
        if (err.response.data.message.product_code) {
          this.errProductCode = 'Code already exists.';
        }
      }
    },
    async updateProduct(product) {
      console.log(product);
      try {
        const res = await http.put(`products/${product.product_id}`, product);
        if (res.data.success) {
          this.updateSuccess = true;
          this.errProductCode = '';
          this.getProducts();
        }
      } catch (err) {
        if (err.response.data.message.product_code) {
          this.errProductCode = 'Code already exists.';
        }
        console.log(err.response.data);
      }
    },
    async deleteProduct(product_id) {
      try {
        const res = await http.delete(`products/${product_id}`);
        if (res.data.success) {
          this.getProducts();
          this.deleteSuccess = true;
        }
      } catch (err) {
        return err;
      }
    },
  },
});