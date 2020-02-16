import React, {createContext, useReducer, useContext} from "react";
import {
    SET_CURRENT_PRODUCT,
    UPDATE_PRODUCT_LIST,
    ADD_PRODUCT,
    REMOVE_PRODUCT,
    UPDATE_CART_LIST,
    LOADING,
    SET_SEARCH_TERM
} from "./actions";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
  case SET_SEARCH_TERM:
    return {
      ...state,
      searchTerm: action.searchTerm
    };
  case SET_CURRENT_PRODUCT:
    return {
      ...state,
      currentProduct: action.product,
      loading: false
    };

  case UPDATE_PRODUCT_LIST:
    return {
      ...state,
      productList: [...action.productList],
      loading: false
    };

  case ADD_PRODUCT:
    return {
      ...state,
      cartList: [action.product, ...state.cartList],
    };

  case REMOVE_PRODUCT:
    return {
      ...state,
      cartList: state.cartList.filter((product) => {
        return product.sku !== action.sku; 
      })
    };

  case UPDATE_CART_LIST:
    return {
      ...state,
      cartList: [...state.cartList],
      loading: false
    };
  
  case LOADING:
    return{
        ...state,
        loading: true
    };

  default:
    return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useReducer(reducer, {
      searchTerm: "top products",
      productList: [],
      currentProduct: {
        sku: 0,
        _id: 0,
        title: "",
        seller: "",
        price: 0,
        description: "",
        thumbnail_url: "",
      },
      cartList: [],
      loading: false
    });
  
    return <Provider value={[state, dispatch]} {...props} />;
  };
  
  const useStoreContext = () => {
    return useContext(StoreContext);
  };
  
  export { StoreProvider, useStoreContext };