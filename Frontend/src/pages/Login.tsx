export function Login() {
    return (
        <div className="flex w-full max-w-5xl min-h-150 flex-row my-20 mx-auto">
            <div className="w-1/2">


            </div>
            <div className="flex flex-col pl-8 items-start w-1/2 mb-4">
                <p className="font-bold text-2xl mb-2">Login to your account</p>
                <p className="font-light mb-10">Enter your credentials to continue</p>
                <form className="w-full mb-8" onSubmit={(e) => (e.preventDefault())}>
                    <label className="block mb-6 w-full"><b>Email address</b>
                        <input className="block w-full border-gray-500 border-2 rounded-md px-3 py-2 mt-2" type="email" placeholder="you@example.com" />
                    </label>
                    <label className="block mb-6 w-full "><b>Password</b>
                        <input className="block w-full border-gray-500 border-2 rounded-md px-3 py-2 mt-2" type="password" />
                    </label>
                    <div className="flex w-full items-center justify-between mb-4">
                        <label htmlFor="remember-me">
                            <input className="mr-2" id="remember-me" type="checkbox" />
                            Remember me
                        </label>
                        <a href="#" className="text-right text-purple-900">Forgot password?</a>
                    </div>

                    <button type="submit" className="border-2 rounded-md p-2 bg-purple-600 text-white block mb-4 hover:scale-101 w-full">Login</button>
                </form>
                <div className="flex flex-row gap-4 items-center justify-center w-full">
                    <p className="">Don't have an account</p>
                    <a href="#" className="text-purple-900">Register </a>
                </div>

            </div>

        </div>
    )
}