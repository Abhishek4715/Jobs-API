import { Link } from "react-router-dom";

export function Home() {
    return (
        <>
            <Link to='/api/v1/auths/login'>
                <button>
                    Login
                </button>
            </Link>
            <Link to='/api/v1/auths/register'>
                <button>
                    Register
                </button>
            </Link>
            <Link to='/api/v1/jobs'>
                <button>
                    Get Job
                </button>
            </Link>
        </>
    )
}