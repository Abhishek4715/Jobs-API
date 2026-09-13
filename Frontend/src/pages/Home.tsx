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
            <Link to='/api/v1/jobs/all'>
                <button>
                    Get Job
                </button>
            </Link>
            <Link to='/api/v1/jobs/create'>
                <button>
                    Create Job
                </button>
            </Link>
        </>
    )
}