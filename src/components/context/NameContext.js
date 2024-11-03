// context/NameContext.js
import React, { createContext, useContext, useState } from 'react';

const NameContext = createContext();

export const useName = () => {
  return useContext(NameContext);
};

export const NameProvider = ({ children }) => {
  const [name, setName] = useState(localStorage.getItem('name') || '');

  const updateName = (newName) => {
    setName(newName);
    localStorage.setItem('name', newName);
  };

  return (
    <NameContext.Provider value={{ name, updateName }}>
      {children}
    </NameContext.Provider>
  );
};