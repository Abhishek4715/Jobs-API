import { Link } from "react-router-dom";

export function Home() {
    return (
        <>
            <Link to='/login'>
                <button>
                    Login
                </button>
            </Link>
            <Link to='/register'>
                <button>
                    Register
                </button>
            </Link>
        </>
    )
}