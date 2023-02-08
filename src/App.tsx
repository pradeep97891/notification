import React, { useState } from "react";
import "./App.scss";
import Notes from "./Components/Notes/Notes";
import { AppStoreProvider } from "./Store/Store";

function App() {
  const [showModal, setShowModal] = useState(true);
  const handleChange = (newValue: any) => {
    console.log(newValue);
    setShowModal(newValue);
  };
  return (
    <AppStoreProvider>
      <Notes show={showModal} onChange={handleChange} />
    </AppStoreProvider>
  );
}

export default App;
