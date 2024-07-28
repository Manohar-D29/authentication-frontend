"use client";

// import { ToastContainer } from "react-toastify";

import React from "react";
import { Toaster } from "react-hot-toast";

const ToastProvider = ({ children }) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
};

export default ToastProvider;
