
import { useContext, useState } from "react";
import { baseurl } from "../services/BaseUrl";
import { AuthContext } from "../context/AuthProvider";
import toast from "react-hot-toast";

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const {accessToken} = useContext(AuthContext)

    const handlePasswordChange = async () => {

        const formdata = {
            current_password: currentPassword,
            new_password: newPassword
        }

        const res = await fetch(`${baseurl}/passwordchange`,{
            method:"PUT",
            headers:{
                Authorization: `Bearer ${accessToken}`,
                "Content-type": "application/json"
            },
            body: JSON.stringify(formdata)
        })
        const data = await res.json();
        console.log(data)
        toast(data?.message || data?.detail)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center text-2xl mb-4">
                        Change Password
                    </h2>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Current Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter current password"
                            className="input input-bordered w-full"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-control mt-3">
                        <label className="label">
                            <span className="label-text">New Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            className="input input-bordered w-full"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>

                    <button onClick={handlePasswordChange} className="btn btn-primary mt-5 w-full">
                        Change Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;