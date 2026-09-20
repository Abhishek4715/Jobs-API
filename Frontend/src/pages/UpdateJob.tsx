import { useState } from "react";
import { useParams } from "react-router-dom"
import { Building2, BriefcaseBusiness, ThumbsUp } from "lucide-react";
import { SidePanel } from "./SidePanel";


export function UpdateJob() {
    type Status = "interview" | "declined" | "pending";
    const [company, setCompany] = useState<string>("");
    const [position, setPosition] = useState<string>("");
    const [status, setStatus] = useState<Status>("interview");
    const [done, setDone] = useState<boolean>(false);
    const { id } = useParams();

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDone(false);

        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:3000/api/v1/jobs/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                company,
                position,
                status
            })
        });

        if (!response.ok) {
            const error = response.json();
            console.log(error);
            return;
        }

        console.log(response.json())
        setDone(true);

    }

    return (
        <div className="flex flex-row w-full">
            <SidePanel />
            <div className="w-full mt-20">
                {!done &&
                    <div className="w-fit min-w-xl mx-auto">
                        <p className="text-3xl font-bold mx-auto mt-8 mb-2  w-fit text-purple-700">Update Job</p>
                        <p className="text-xl font-bold mx-auto mb-4  w-fit text-purple-700">{id}</p>
                        <form className="flex flex-col gap-8 p-2" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="company" className='font-bold'>Company</label>
                                <div className="flex flex-row gap-2 items-center mt-2">
                                    <Building2 />
                                    <input id="company" type="text" value={company} onChange={(e) => setCompany(e.target.value)} className='focus:outline-none focus:ring-0 border-2 border-gray-500/50 rounded-md w-full p-2' />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="position" className='font-bold'>Position</label>
                                <div className="flex flex-row gap-2 items-center mt-2">
                                    <BriefcaseBusiness />
                                    <input id="position" type="text" value={position} onChange={(e) => setPosition(e.target.value)} className='focus:outline-none focus:ring-0 border-2 border-gray-500/50 rounded-md w-full p-2' />
                                </div>
                            </div>

                            <div className="flex flex-row gap-2 items-center justify-between mt-2">
                                <label htmlFor="status" className='font-bold'>Status</label>
                                <select value={status} onChange={(e) => setStatus(e.target.value as Status)} className="px-3 py-1.5 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-purple-500 cursor-pointer">
                                    <option value="interview">Interview</option>
                                    <option value="declined">Declined</option>
                                    <option value="pending">Pending</option>
                                </select>
                            </div>
                            <button type="submit" className='bg-purple-600 hover:bg-purple-700 text-white rounded-md mt-2 px-2 py-2 mb-6' disabled={done} >Update Job</button>
                        </form>
                    </div>
                }
                {done &&
                    <div className="flex flex-row gap-2 items-center justify-center bg-purple-800 w-fit h-fit mx-auto mt-40 p-6 rounded-xl ">
                        <p className="text-6xl w-fit">Job Upated</p>
                        <ThumbsUp className="scale-250 ml-4"/>
                    </div>
                }
            </div>
        </div>
    )
}