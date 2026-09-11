
const HeroBanner = () => {
    return (
        <div>
            <div
                className="hero min-h-500px"
                style={{
                    backgroundImage:
                        "url(https://images.unsplash.com/photo-1694730750153-8b66cf3dd014?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                }}
            >
                <div className="hero-overlay"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Discover.Borrow.Manages</h1>
                        <p className="mb-5">
                            A modern platform to manage books, users, reservations, and borrowing with ease — making library management faster, simpler, and more efficient.
                        </p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;