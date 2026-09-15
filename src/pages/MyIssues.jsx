import { useContext, useEffect, useState } from "react";
import { baseurl } from "../services/BaseUrl";
import { AuthContext } from "../context/AuthProvider";

const MyIssues = () => {
    const [myIssues, setMyIssues] = useState([]);
    const { accessToken } = useContext(AuthContext);

    useEffect(() => {
        if (!accessToken) return;

        fetch(`${baseurl}/issues/my`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => setMyIssues(data))
            .catch(err => console.log(err));
    }, [accessToken]);

    const formatDate = (date) => {
        if (!date) return "Not returned";
        return new Date(date).toLocaleDateString("en-GB");
    };

    return (
        <div className="min-h-screen bg-base-200 py-10 px-4">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">
                        My Issued Books
                    </h1>
                    <p className="text-base-content/60 mt-2">
                        View all your issued books and their return details.
                    </p>
                </div>

                {/* Table */}
                {myIssues.length === 0 ? (
                    <div className="text-center py-16 bg-base-100 rounded-xl shadow">
                        <div className="text-5xl mb-4">📚</div>
                        <h2 className="text-xl font-semibold">
                            No Issued Books
                        </h2>
                        <p className="text-base-content/60 mt-2">
                            You haven't issued any books yet.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Issue ID</th>
                                    <th>Book ID</th>
                                    <th>User ID</th>
                                    <th>Issue Date</th>
                                    <th>Due Date</th>
                                    <th>Return Date</th>
                                    <th>Status</th>
                                    <th>Fine Amount</th>
                                    <th>Fine Paid</th>
                                </tr>
                            </thead>

                            <tbody>
                                {myIssues.map((issue, index) => (
                                    <tr key={issue.id}>
                                        <td>{index + 1}</td>

                                        <td className="font-medium">
                                            #{issue.id}
                                        </td>

                                        <td>
                                            {issue.book_id}
                                        </td>

                                        <td>
                                            {issue.user_id}
                                        </td>

                                        <td>
                                            {formatDate(issue.issue_date)}
                                        </td>

                                        <td className="text-warning font-medium">
                                            {formatDate(issue.due_date)}
                                        </td>

                                        <td>
                                            {formatDate(issue.return_date)}
                                        </td>

                                        <td>
                                            <span
                                                className={`badge ${
                                                    issue.status === "issued"
                                                        ? "badge-success"
                                                        : "badge-info"
                                                }`}
                                            >
                                                {issue.status}
                                            </span>
                                        </td>

                                        <td className="font-semibold">
                                            ৳{issue.fine_amount}
                                        </td>

                                        <td>
                                            <span
                                                className={`badge ${
                                                    issue.fine_paid
                                                        ? "badge-success"
                                                        : "badge-ghost"
                                                }`}
                                            >
                                                {issue.fine_paid ? "Paid" : "Not Paid"}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

            </div>
        </div>
    );
};

export default MyIssues;