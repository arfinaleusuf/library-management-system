import { Link } from "react-router";


const SignUp = () => {
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-5xl font-bold">Sign Up Now!</h1>
                    <p className="py-6 w-96">
                       Please Fill The Input Currectly
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <fieldset className="fieldset">
                            <label className="label">Email</label>
                            <input type="email" className="input" placeholder="Email" />
                            <label className="label">Password</label>
                            <input type="password" className="input" placeholder="Password" />
                            <div><Link to={"/signup"} className="link link-hover">Don't Have an account?</Link></div>
                            <button className="btn btn-neutral mt-4">Login</button>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;