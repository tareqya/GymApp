import React from "react";

const Context = React.createContext();

const Provider = ({ children }) => {
  const [theme, setTheme] = React.useState("dark");
  return (
    <Context.Provider value={{ theme, setTheme }}>{children}</Context.Provider>
  );
};

export default { Context, Provider };
