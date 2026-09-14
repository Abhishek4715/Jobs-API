import { Link } from "react-router-dom"
import { BriefcaseBusiness, PlusCircle, Trash, Pen, LogOut } from "lucide-react";

export function SidePanel() {

    const panelItem: string[] = ["All Jobs", "Create Job", "Delete Job", "Update Job"];
    const panelIcon = [BriefcaseBusiness, PlusCircle, Trash, Pen];
    return (
        <div className="w-1/5 outline-2 bg-gray-800 flex flex-col h-screen items-center sticky top-0">
            <p className="text-2xl w-fit mb-4 mt-4 text-purple-800 font-bold">Jobs Track</p>

            {panelItem.map((item, index) => {
                const Icon = panelIcon[index];
                return (
                    <div key={index} className="flex flex-row justify-center items-center">
                        <Icon />
                        <Link key="item" to={`/api/v1/jobs/${item.split(" ")[0].toLowerCase()}`} className={`my-2 p-2`}  >
                            <button className="text-white">{item}</button>
                        </Link>
                    </div>
                )
            })}
            <div className="mt-auto mb-4 flex flex-row items-center justify-center gap-1">
                <LogOut />
                <span className="text-red-700">Logout</span>
            </div>
        </div>
    )
}