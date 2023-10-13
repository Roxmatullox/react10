import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Teachers from "./pages/Teachers"
import Students from "./pages/Students"
import {useState} from "react"
import NotFound from "./pages/NotFound"
import AdminLayout from "./components/AdminLayout"

function App() {
  const [login , setLogin] = useState(localStorage.getItem("Login") ? true : false)

  return (
    <BrowserRouter >
      <Routes >
        <Route path="/" element={ <Navigate to="/login" />} />
        <Route path="/login" element={<Login setLogin={setLogin} />} />
        {
          login ? <Route element={<AdminLayout />} >
            <Route path="teachers" element={<Teachers />} />
            <Route path="students" element={<Students />} />
          </Route> : null
        }
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
