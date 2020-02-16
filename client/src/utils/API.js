const axios = require("axios");

export default {
    searchProduct: query => {
        return axios.get("/api/products", {params: {q: query}});
    },
    getProductInfo: sku => {
        return axios.get(`/api/products/search/${sku}`);
    },
    addProduct: productObj => {
        return axios.post("/api/products",productObj);
    },
    removeProduct: sku => {
        return axios.delete(`/api/products/search/${sku}`);
    }
};