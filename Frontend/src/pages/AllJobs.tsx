import { useState, useEffect } from "react";
import { SidePanel } from "./SidePanel";
import { Trash2 } from "lucide-react";
import type { jobType } from "../types/Job";

export function AllJobs() {
    const [data, setData] = useState<jobType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:3000/api/v1/jobs",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch jobs");
            }

            const { jobs } = await response.json();
            setData(jobs);
        }
        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:3000/api/v1/jobs/${id}`, {
            method: "DELETE",
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
        setData((prev) => prev.filter((job) => job._id != id));
    }

    return (
        <div className="flex flex-row">
            <SidePanel />
            <div className="w-full">
                <p className="text-2xl font-bold m-auto mt-4 mb-10 w-fit text-purple-700">All Jobs List</p>
                {data.map((job) => (
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
                        <div className="bg-red-600 w-10 h-30 rounded-r-md relative" onClick={() => handleDelete(job._id)}>
                            <Trash2 className="absolute top-12 left-2 text-gray-700" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}