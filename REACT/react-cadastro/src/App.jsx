import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Cadastro from "./pages/Pages/Cadastro"
import Login from "./pages/Pages/Login"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cadastro />} />
         <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>




  )
}

export default App
