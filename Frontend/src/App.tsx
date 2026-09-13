import { Routes, Route} from "react-router-dom";;
import { Login } from './pages/Login';
import { Home } from './pages/Home.tsx';
import { Register } from "./pages/Register.tsx";
import { AllJobs } from "./pages/AllJobs.tsx";
import { CreateJob } from "./pages/CreateJob.tsx"
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path='/api/v1/auths/login' element={<Login />} />
        <Route path="/api/v1/auths/register" element={<Register />} />
        <Route path="/api/v1/jobs/all" element={<AllJobs />} />
        <Route path="/api/v1/jobs/create" element={<CreateJob />} />
      </Routes>
    </>
  )
}

export default App 