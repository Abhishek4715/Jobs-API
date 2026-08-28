import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, Phone } from 'lucide-react'
import Register_Img from '../Assets/Register_Img.png'

export function Register() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmpassword, setConfirmPassword] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);
    const [phone, setPhone] = useState<string | number | readonly string[] | undefined>(undefined);
    const [checkbox, setCheckbox] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (submitting) return;
        setSubmitting(true);
        try {
            const response = await fetch("http://localhost:3000/api/v1/auths/register", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                })
            });

            if (!response.ok) {
                const error = response.json();
                console.log(error);
                return;
            }

            const data = await response.json();
            console.log(data);
            localStorage.setItem("token", data.token);
        } finally{
            setSubmitting(false);
        }
    }

    return (
        <div className='flex flex-row w-full max-w-5xl min-w-80/100 h-full mx-40 shadow-sm shadow-black mt-5 rounded-2xl'>
            <div className="hidden md:block w-1/2 rounded-l-2xl">
                <img src={Register_Img} className='rounded-l-2xl'></img>
            </div>
            <div className="flex flex-col w-full md:w-1/2 px-8 items-start mt-8">
                <p className='font-bold text-2xl mb-2'>Create your account</p>
                <p className='font-light mb-10'>Fill the deatils below to get started</p>
                <form className="flex flex-col mb-6" onSubmit={handleSubmit}>
                    <div className='flex flex-row gap-6 mb-6'>
                        <div className='flex flex-col'>
                            <label htmlFor="name" className='font-bold mb-2'>Full name</label>
                            <div className='relative'>
                                <User className='absolute left-1.5 top-2.5' />
                                <input value={name} id='name' type="text" className='focus:outline-none focus:ring-0 border-2 border-gray-500/50 rounded-md w-full pl-8 pr-2 py-2' onChange={(e) => { setName(e.target.value) }} />
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="email" className='font-bold mb-2'>Email address</label>
                            <div className='relative'>
                                <Mail className='absolute left-1.5 top-2.5' />
                                <input value={email} id="email" type="email" className='focus:outline-none focus:ring-0 border-2 border-gray-500/50 rounded-md w-full pl-8 pr-2 py-2' onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <label htmlFor="password" className='font-bold mb-2'>Passoword</label>
                    <div className='relative'>
                        <Lock className='absolute left-1.5 top-2.5'></Lock>
                        <input value={password} id="password" type={show ? "text" : "password"} className='focus:outline-none focus:ring-0 border-2 border-gray-500/50 rounded-md p-8 py-2 mb-6 w-full' onChange={(e) => setPassword(e.target.value)} />
                        <button type="button" className='absolute right-1.5 top-2.5' onClick={() => setShow(!show)}>
                            {show ? <Eye /> : <EyeOff />}
                        </button>
                    </div>
                    <label htmlFor="confirm password" className='font-bold mb-2'>Confirm password</label>
                    <div className='relative'>
                        <Lock className='absolute left-1.5 top-2.5'></Lock>
                        <input value={confirmpassword} id="password" type={show ? "text" : "password"} className='focus:outline-none focus:ring-0 border-2 border-gray-500/50 rounded-md p-8 py-2 mb-6 w-full' onChange={(e) => setConfirmPassword(e.target.value)} />
                        <button type="button" className='absolute right-1.5 top-2.5' onClick={() => setShow(!show)}>
                            {show ? <Eye /> : <EyeOff />}
                        </button>
                    </div>
                    <label htmlFor="phone no" className='mb-2'><b>Phone number</b> (optional)</label>
                    <div className="relative">
                        <Phone className="absolute left-1.5 top-2.5" />
                        <input value={phone} id="phone no" type="tel" inputMode="numeric" className='focus:outline-none focus:ring-0 border-2 border-gray-500/50 rounded-md pl-8 pr-2 py-2 mb-6 w-full' onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className='flex flex-row mb-10 items-center'>
                        <input checked={checkbox} type="checkbox" className='rounded-2xl mr-2' onClick={() => setCheckbox(!checkbox)} />
                        <p>I agree to the Terms of Service and Privacy Policy</p>
                    </div>
                    <button type="submit" className='bg-purple-600 hover:bg-purple-700 text-white rounded-md px-2 py-2 mb-6' disabled={submitting} >Register</button>
                    <div className='flex flex-row justify-center gap-2'>
                        <p>Already have an account?</p>
                        <Link to='/login' className='text-purple-900'>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}