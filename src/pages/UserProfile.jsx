import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const UserProfile = () => {
    const { authUser } = useContext(AuthContext);

    console.log(authUser);

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
            <div className="card w-full max-w-2xl bg-base-100 shadow-xl">
                <div className="card-body">

                    {/* Profile Header */}
                    <div className="text-center mb-6">
                        <div className="avatar placeholder mb-3">
                            <div className="bg-primary text-primary-content w-24 rounded-full">
                                <span className="text-3xl">
                                    {authUser?.firstname?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold">
                            My Profile
                        </h2>

                        <p className="text-base-content/60">
                            View and update your personal information
                        </p>
                    </div>

                    {/* Profile Form */}
                    <form className="space-y-4">

                        {/* Email */}
                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">
                                    Email
                                </span>
                            </label>

                            <input
                                type="email"
                                defaultValue={authUser?.email || ""}
                                className="input input-bordered w-full"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Username */}
                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">
                                    Username
                                </span>
                            </label>

                            <input
                                type="text"
                                defaultValue={authUser?.username || ""}
                                className="input input-bordered w-full"
                                placeholder="Enter your username"
                            />
                        </div>

                        {/* Firstname & Lastname */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div>
                                <label className="label">
                                    <span className="label-text font-semibold">
                                        First Name
                                    </span>
                                </label>

                                <input
                                    type="text"
                                    defaultValue={authUser?.firstname || ""}
                                    className="input input-bordered w-full"
                                    placeholder="Enter first name"
                                />
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text font-semibold">
                                        Last Name
                                    </span>
                                </label>

                                <input
                                    type="text"
                                    defaultValue={authUser?.lastname || ""}
                                    className="input input-bordered w-full"
                                    placeholder="Enter last name"
                                />
                            </div>

                        </div>

                        {/* Read Only Information */}
                        <div className="divider">Account Information</div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                            <div>
                                <label className="label">
                                    <span className="label-text font-semibold">
                                        User ID
                                    </span>
                                </label>

                                <input
                                    type="text"
                                    value={authUser?.id || ""}
                                    className="input input-bordered w-full"
                                    readOnly
                                />
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text font-semibold">
                                        Role
                                    </span>
                                </label>

                                <input
                                    type="text"
                                    value={authUser?.role || ""}
                                    className="input input-bordered w-full capitalize"
                                    readOnly
                                />
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text font-semibold">
                                        Status
                                    </span>
                                </label>

                                <input
                                    type="text"
                                    value={authUser?.is_active ? "Active" : "Inactive"}
                                    className="input input-bordered w-full"
                                    readOnly
                                />
                            </div>

                        </div>

                        {/* Update Button */}
                        <div className="flex justify-end mt-6">
                            <button
                                type="submit"
                                className="btn btn-primary px-8"
                            >
                                Update Profile
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;