import { useContext, useState } from "react";
import { baseurl } from "../../services/BaseUrl";
import { AuthContext } from "../../context/AuthProvider";
import toast from "react-hot-toast";

const ManageIssue = () => {
    const [issueId, setIssueId] = useState(null)
    const [payReturnIssueId, setPayReturnIssueId] = useState(null)
    const {accessToken} = useContext(AuthContext)

    const handleReturnBook = async () =>{
        const res = await fetch(`${baseurl}/admin/return_book/${issueId}`,{
            method: "PUT",
            headers:{
                Authorization: `Bearer ${accessToken}`
            }
        })

        const data = await res.json()
        toast.success(data.message)
    }

    return (
        <div className="min-h-screen bg-base-200 p-6">
            <h2 className="text-2xl font-bold mb-6">Manage Issues</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Card 1 */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Return Book</h2>
                        <p className="text-sm text-gray-500">
                            Enter the issue ID to return a book.
                        </p>

                        <input
                            type="number"
                            value={issueId}
                            onChange={(e)=>setIssueId(e.target.value)}
                            placeholder="Enter Issue ID"
                            className="input input-bordered w-full mt-3"
                            required
                        />

                        <div className="card-actions justify-end mt-3">
                            <button onClick={handleReturnBook} className="btn btn-primary">
                                Return Book
                            </button>
                        </div>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Return with Fine Book</h2>
                        <p className="text-sm text-gray-500">
                            Enter the issue record ID to return a book with fine.
                        </p>

                        <input
                            type="number"
                            value={payReturnIssueId}
                            onChange={(e)=>setPayReturnIssueId(e.target.value)}
                            placeholder="Enter Issue ID"
                            className="input input-bordered w-full mt-3"
                            required
                        />

                        <div className="card-actions justify-end mt-3">
                            <button className="btn btn-secondary">
                                Return Book By Pay
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ManageIssue;