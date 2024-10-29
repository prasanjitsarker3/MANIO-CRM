"use client";
import React from "react";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../Redux/store";
import { NextUIProvider } from "@nextui-org/react";

const ProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NextUIProvider>
          <Toaster position="top-center" richColors />
          {children}
        </NextUIProvider>
      </PersistGate>
    </Provider>
  );
};

export default ProviderWrapper;
