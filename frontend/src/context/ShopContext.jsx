import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND;
  const [token, setToken] = useState("");
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItem, setCartItem] = useState({});
  const [products, setproducts] = useState([]);
  const navigate = useNavigate();

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItem);
    cartData[itemId][size] = quantity;
    setCartItem(cartData);
    if(token){
      try {
         const response= await axios.post(backendUrl+'api/cart/update',{itemId,size,quantity},{headers:{token}})
         if(response.data.success){
          toast.success(response.data.message)
         }
      } catch (error) {
        console.log('not update')
        toast.error(error.message)

        
      }
    }
  };
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
    let cartData = structuredClone(cartItem);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItem(cartData);
    if(token){
      try {
        // console.log(token)
        const response= await axios.post(backendUrl+'api/cart/add',{itemId,size},{headers:{token}})
        if(response.data.success){
          toast.success(response.data.message)
        }
        console.log(response)
      } catch (error) {
        console.log(error.message)
        toast.error("network issues")
      }
    }
  };


  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item]) {
            totalCount += cartItem[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };
  const getCartAmount = () => {
    let totalAmout = 0;
    for (const items in cartItem) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalAmout = itemInfo.price * cartItem[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmout;
  };
  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "api/product/list");
      if (response.data.success) {
        console.log(response.data.products);
        setproducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("network erro");
      toast.error(error.message);
    }
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    setCartItem
  };

  const getUserCart =async(token)=>{
    try {
        const response =await axios.post(backendUrl+'api/cart/get',{},{headers:{token}})
        if(response.data.success){
          setCartItem(response.data.cartData)
        }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }
  }
  useEffect(() => {
    getProductsData();
   
    console.log(cartItem);
  }, [cartItem]);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"))
    }
  }, []);

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
