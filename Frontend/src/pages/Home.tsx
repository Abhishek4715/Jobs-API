import { useNavigate, Link } from "react-router-dom";
import { ClipboardList, ChartNoAxesCombined, FolderKanban } from "lucide-react";

export function Home() {
    const navigate = useNavigate();

    const handleStart = () => {
        const token = localStorage.getItem("token");
        
        if (token) {console.log(token);
            navigate("/api/v1/jobs/all");
        }
        else {
            navigate("/api/v1/auths/login");
        }
    }

    return (
        <div className="flex flex-col p-4">
            <div className="flex flex-row justify-between">
                <p className="text-3xl text-purple-700 font-bold">JobTracker</p>
                <div className="flex flex-row gap-3">
                    <Link to={"/api/v1/auths/login"} className="text-3xl text-purple-700 font-bold">Login</Link>
                    <Link to={"/api/v1/auths/register"} className="text-3xl text-purple-700 font-bold">Register</Link>
                </div>
            </div>
            <div className="flex flex-col items-center mt-34 gap-2">
                <p  className="text-6xl mb-2">Track Every Application</p>
                <p className="text-2xl mb-6"> Keep your applications organized and never lose track of an opportunity.  </p>
                <button onClick={handleStart} className="w-fit h-fit p-3 text-2xl text-white bg-purple-600 rounded-xl">Get Started</button>
                <div className="flex flex-row items-center gap-16 mt-35">
                    <div className="h-45 w-45 outline-2 flex flex-col justify-center items-center gap-1 p-3">
                        <div className="h-45 w-45 flex flex-col justify-center items-center gap-1">
                            <ClipboardList size={40} />
                            <p className="text-xl">Track Jobs</p>
                        </div>
                        <p className="text-base text-center">Store and view all jobs</p>
                    </div>
                    <div className="h-45 w-45 outline-2 flex flex-col justify-center items-center gap-1 p-3">
                        <div className="h-45 w-45 flex flex-col justify-center items-center gap-1">
                            <ChartNoAxesCombined size={40} />
                            <p className="text-xl">Moniter Progress</p>
                        </div>
                        <p className="text-base text-center">See the state of applications</p>
                    </div>
                    <div className="h-45 w-45 outline-2 flex flex-col justify-center items-center gap-1 p-3">
                        <div className="h-45 w-45 flex flex-col justify-center items-center gap-1">
                            <FolderKanban size={40} />
                            <p className="text-xl">Stay Organized</p>
                        </div>
                        <p className="text-base text-center">Manage applications lifecycle </p>
                    </div>
                </div>
            </div>

        </div>
    )
}