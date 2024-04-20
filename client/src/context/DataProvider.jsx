import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  // Destructure children from props
  const [account, setAccount] = useState({ name: "", username: "" });

  return (
    // Wrap JSX in parentheses
    <DataContext.Provider
      value={{
        account,
        setAccount,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
