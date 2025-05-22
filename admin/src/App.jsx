import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";

import { ToastContainer } from 'react-toastify';

export const backendUrl= import.meta.env.VITE_BACKEND


const App = () => {
  const [token ,setToken]=useState(localStorage.getItem('token')? localStorage.getItem('token'):'')
 useEffect(()=>{
  localStorage.setItem('token',token)
 // console.log(token)

 },[token])



  return (
    <div className="bg-gray-50 min-h-screen">
     <ToastContainer />
    { token===''? <Login setToken={setToken} token={token}/> :
      <div>
        <Navbar setToken={setToken} />
        <hr />
        <div className="flex w-full">
          <Sidebar />
          <div className="w-[70%] mx-auto ml-[max(5vh,25px)] my-8 text-gray-600 text-base">
            <Routes>
              <Route index path="/add" element={<Add token={token} />} />
              <Route path="/list" element={<List token={token} />} />
              <Route path="/orders" element={<Orders token={token} />} />
            </Routes>
          </div>
        </div>
      </div>
    }
    </div>
  );
};

export default App;
