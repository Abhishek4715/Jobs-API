import { useState, useEffect } from "react";
import type { jobType } from "../types/Job";

export function AllJobs() {
    const [data, setData] = useState<jobType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:3000/api/v1/jobs",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch jobs");
            }

            const { jobs } = await response.json();
            setData(jobs);
            console.log(jobs);
        }
        fetchData();
    }, []);

    return (
        <div>    
            <p className="text-2xl m-auto w-32">All Jobs List</p>
            {data.map((job) => (
                <div key={job._id} className="flex flex-col w-xl m-auto rounded-md bg-purple-200 gap-2 my-10 py-3" >
                    <p className="ml-[33%]">{job.company}</p>
                    <p className="ml-[33%]">{job.position}</p>
                    <p className="ml-[33%]">{job.position}</p>
                    <p className="ml-[33%]">{job.status}</p>
                </div>
            ))}
        </div>
    )
}