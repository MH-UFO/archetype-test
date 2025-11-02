import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/global.css';
import GuidePage from "./components/Info";
import StartTest from "./components/startTest";
import Welcome from "./components/Welcome";
import Test from "./components/Test"
import axios from "axios";

function App() {
  async function test() {
    try {
      let heath = await axios.get("http://localhost:3000/api/health");
      console.log(heath.data);
    } catch (err) {
      console.log(err.message);
    }
  }
  useEffect(() => {
    test()
  }, [])

  return (
    <div>
      <main>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/archetype_test" element={<StartTest />} />
          <Route path="/guid" element={<GuidePage />} />
          <Route path="/archetype_test/female" element={<Test gender="female" />} />
          <Route path="/archetype_test/male" element={<Test gender="male" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;