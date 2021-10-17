import React, {useEffect} from "react";
import { Routes } from "./routes/index"
import logo from './logo.svg';
import './App.css';

function App() {
  // Filter array
  useEffect(() => {
    let arr1 = [1,2,3,4]
    let arr2 = [2,4]
    console.log(arr1.filter(v => arr2.includes(v)))
  },[])

  return (
    <>
      <div className="limiter">
        <div className="container-login100">
          <Routes/>
        </div>
      </div>
    </>
  );
}

export default App;
