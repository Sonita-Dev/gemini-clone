import React from "react";
import Main from "./components/Main/Main";
import { ContextProvider } from "./context/Context";
import Sidebar from "./components/Sidebar/Sidebar";
const App = () => {
  return (
    <ContextProvider>
      <Sidebar />
      <Main />
    </ContextProvider>
  );
};

export default App;
