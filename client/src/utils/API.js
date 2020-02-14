const axios = require("axios");

export default {
    searchProduct: (query) => {
        return axios.get("/api/products", {params: {q: query}});
    }
};