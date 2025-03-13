import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/auth/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>hello</h1>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
