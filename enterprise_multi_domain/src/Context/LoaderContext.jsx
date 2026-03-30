import React, { createContext, useContext, useState } from "react";

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("spinner"); // "spinner" | "skeleton"

  return (
    <LoaderContext.Provider value={{ loading, setLoading, type, setType }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
