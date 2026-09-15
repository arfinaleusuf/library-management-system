import { useContext, useState } from "react";
import { baseurl } from "../../services/BaseUrl";
import { AuthContext } from "../../context/AuthProvider";
import toast from "react-hot-toast";

const IssueBooks = () => {
    const [userId, setUserId] = useState("");
    const [bookId, setBookId] = useState("");
    const {accessToken} = useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            user_id : userId,
            book_id : bookId
        }

        const res = await fetch(`${baseurl}/admin/create_issue`,{
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(formData)
        })

        const data = await res.json();
        toast.success(data.message)
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-2xl mb-4">
                        Issue Book
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* User ID */}
                        <div>
                            <label className="label">
                                <span className="label-text">User ID</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Enter user ID"
                                className="input input-bordered w-full"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                required
                            />
                        </div>

                        {/* Book ID */}
                        <div>
                            <label className="label">
                                <span className="label-text">Book ID</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Enter book ID"
                                className="input input-bordered w-full"
                                value={bookId}
                                onChange={(e) => setBookId(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-full">
                            Issue Book
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default IssueBooks;