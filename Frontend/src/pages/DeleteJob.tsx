import { useState, useEffect } from "react";
import { Trash2, RotateCcw } from "lucide-react";
import { SidePanel } from "./SidePanel";
import type { jobType } from "../types/Job";

export function DeleteJob() {
    const [jobs, setJobs] = useState<jobType[]>([]);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch("http://localhost:3000/api/v1/jobs/delete",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch deleted jobs");
                }

                const { jobs } = await response.json();
                setJobs(jobs);
            } catch (error) {
                console.log(error);
            }
        }
        fetchJob();
    }, []);

    const handleAction = async (id: string, method: string) => {
        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:3000/api/v1/jobs/delete/${id}`, {
            method: `${method}`,
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const error = response.json();
            console.log(error);
            return;
        }
        console.log(response.json());
        setJobs((prev) => prev.filter((job) => job._id != id));

    }

    return (
        <div className="flex flex-row">
            <SidePanel />
            <div className="w-full flex flex-col items-center">
                <p className="text-3xl font-bold text-purple-700 mt-14">Deleted Jobs</p>
                <p className="text-xl text-purple-700 mt-2 mb-10">Recently Deleted Jobs</p>
                <div>
                    {jobs.map((job) => (
                        <div key={job._id} className="h-fit flex flex-row justify-center" dir="ltr">
                            <div className="flex flex-col w-xl rounded-s-md bg-purple-200 gap-2 mb-10 p-3 h-30">
                                <div className="flex flex-row gap-2 justify-between mx-10">
                                    <p>Company: </p>
                                    <p className="ml-[33%]">{job.company}</p>
                                </div>
                                <div className="flex flex-row gap-2 justify-between mx-10">
                                    <p>Position: </p>
                                    <p className="ml-[33%]">{job.position}</p>
                                </div>
                                <div className="flex flex-row gap-2 justify-between mx-10">
                                    <p>Status: </p>
                                    <p className="ml-[33%]">{job.status}</p>
                                </div>
                            </div>
                            <div className="bg-red-400 w-10 h-30 relative" onClick={() => handleAction(job._id, "DELETE")}>
                                <Trash2 className="absolute top-12 left-2 text-gray-700" />
                            </div>
                            <div className="bg-green-300 w-10 h-30 rounded-r-md relative" onClick={() => handleAction(job._id, "PATCH")}>
                                <RotateCcw className="absolute top-12 left-2 text-gray-700" />
                            </div> 
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}