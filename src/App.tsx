import React, { useState,useEffect } from "react";
import "./App.scss";
import Notes from "./Components/Notes/Notes";

function App() {
  const [showModal, setShowModal] = useState(true);
  const handleChange = (newValue: any)=> {
    console.log(newValue)
    setShowModal(newValue);
  }
  return (
    <div className="App">
      {/* <button
        className="bg-blue-800 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={(() => setShowModal(true))}
      >
        Open regular modal
      </button> */}
   <Notes show={showModal} onChange={handleChange}/>
    </div>
  );
}

export default App;
