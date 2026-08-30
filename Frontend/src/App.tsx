import { Routes, Route} from "react-router-dom";;
import { Login } from './pages/Login';
import { Home } from './pages/Home.tsx';
import { Register } from "./pages/Register.tsx";
import './App.css';
import { AllJobs } from "./pages/AllJobs.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path='/api/v1/Auths/login' element={<Login />} />
        <Route path="/api/v1/Auths/register" element={<Register />} />
        <Route path="/api/v1/Jobs" element={<AllJobs />} />
      </Routes>
    </>
  )
}

export default App 