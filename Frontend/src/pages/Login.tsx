import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Login_Img from "../Assets/Login_Img.png"

export function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [remember, setRemember] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await fetch("http://localhost:3000/api/v1/auths/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                email,
                password,
            })
        });

        if(!response.ok) {
            const error = await response.json();
            console.log(error);
            return;
        }

        const data = await response.json();
        console.log(data);
        localStorage.setItem('token', data.token);
    }

    return (
        <div className="flex w-full max-w-5xl h-max flex-row mx-auto mt-20 shadow-sm shadow-black rounded-2xl">
            <div className="hidden rounded-2xl md:block md:w-1/2    ">
                <img className="rounded-l-2xl" src={Login_Img} alt="Company Logo" />

            </div>
            <div className="flex flex-col px-8 items-start w-full md:w-1/2 mt-15">
                <p className="font-bold text-2xl mb-2">Login to your account</p>
                <p className="font-light mb-10">Enter your credentials to continue</p>
                <form className="w-full mb-8" onSubmit={handleSubmit}>
                    <label htmlFor='email' className="block w-full"><b>Email address</b></label>
                    <div className=" flex items-center relative">
                        <Mail className="absolute left-3 top-4.5" />
                        <input id="email" value={email} className="block w-full border-gray-500/50 border-2 focus:outline-none focus:ring-0 rounded-md pr-3 pl-12 py-2 mt-2 mb-10" type="email" placeholder="you@example.com" required
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <label htmlFor="password" className="block w-full"><b>Password</b></label>
                    <div className="flex items-center relative mb-6">
                        <Lock className="absolute left-3 top-4.5" />
                        <input id='password' value={password} className="block w-full border-gray-500/50 border-2 focus:outline-none focus:ring-0 rounded-md px-12 py-2 mt-2" type={show ? "text" : "password"} required
                            onChange={(e) => setPassword(e.target.value)} />
                            <button type="button" className="absolute right-3 top-4.5" onClick={() => setShow(!show)}>
                                {show? <EyeOff />: <Eye />}
                            </button>
                    </div>
                    <div className="flex w-full items-center justify-between mb-12">
                        <label htmlFor="remember-me">
                            <input checked={remember} className="mr-2" id="remember-me" type="checkbox"
                                onChange={(e) => setRemember(e.target.checked)} />
                            Remember me
                        </label>
                        <a href="#" className="text-right text-purple-900">Forgot password?</a>
                    </div>

                    <button type="submit" className="border-2 rounded-md p-2 bg-purple-600 text-white block mt-16 mb-2 hover:bg-purple-700 transition w-full">Login</button>
                </form>
                <div className="flex flex-row gap-4 items-center justify-center w-full">
                    <p>Don't have an account</p>
                    <a href="#" className="text-purple-900">Register </a>
                </div>

            </div>

        </div>
    )
}