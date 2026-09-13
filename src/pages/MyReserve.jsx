import { useContext, useEffect, useState } from "react";
import { baseurl } from "../services/BaseUrl";
import { AuthContext } from "../context/AuthProvider";

const MyReserve = () => {
    const [myReserve, setMyReserve] = useState([]);
    const { accessToken } = useContext(AuthContext);

    const cancleReserve = async (id) => {
        const res = await fetch(`${baseurl}/reserve/cancel/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        const data = await res.json();
        alert(data.message);
        fetchReservation();
    };

    const fetchReservation = () => {
        fetch(`${baseurl}/reserve/my`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => setMyReserve(data))
            .catch(err => console.log(err));
    }

    useEffect(() => {
        if(!accessToken) return;
        fetchReservation()
    }, [accessToken]);

    return (
        <div className="min-h-screen bg-base-200 px-4 py-10">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">
                        My Reservations
                    </h1>
                    <p className="text-gray-500 mt-2">
                        View and manage your book reservations.
                    </p>
                </div>

                {/* Empty State */}
                {myReserve.length === 0 ? (
                    <div className="text-center py-20 bg-base-100 rounded-2xl shadow-sm">
                        <h2 className="text-2xl font-semibold">
                            No Reservations Found
                        </h2>
                        <p className="text-gray-500 mt-2">
                            You haven't reserved any books yet.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {myReserve.map((reserve) => (
                            <div
                                key={reserve.id}
                                className="card bg-base-100 shadow-md border border-base-300 hover:shadow-xl transition duration-300"
                            >
                                <div className="card-body">

                                    {/* Card Header */}
                                    <div className="flex justify-between items-center">
                                        <h2 className="card-title text-lg">
                                            Reservation #{reserve.id}
                                        </h2>

                                        <div
                                            className={`badge ${reserve.status === "pending"
                                                ? "badge-warning"
                                                : reserve.status === "approved"
                                                    ? "badge-success"
                                                    : reserve.status === "rejected"
                                                        ? "badge-error"
                                                        : "badge-ghost"
                                                } capitalize`}
                                        >
                                            {reserve.status}
                                        </div>
                                    </div>

                                    <div className="divider my-2"></div>

                                    {/* Reservation Info */}
                                    <div className="space-y-4">

                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-500">
                                                📚 Book ID
                                            </span>
                                            <span className="font-semibold">
                                                {reserve.book_id}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-500">
                                                👤 User ID
                                            </span>
                                            <span className="font-semibold">
                                                {reserve.user_id}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-start gap-4">
                                            <span className="text-gray-500">
                                                📅 Reserved On
                                            </span>
                                            <span className="font-medium text-right">
                                                {new Date(
                                                    reserve.reservation_date
                                                ).toLocaleDateString("en-GB", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric"
                                                })}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-500">
                                                🕒 Time
                                            </span>
                                            <span className="font-medium">
                                                {new Date(
                                                    reserve.reservation_date
                                                ).toLocaleTimeString("en-US", {
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                })}
                                            </span>
                                        </div>

                                    </div>

                                    {/* Footer */}
                                    <div className="card-actions justify-end mt-4">
                                        <button onClick={() => cancleReserve(reserve.id)} className="btn btn-outline btn-sm">
                                            Cancle
                                        </button>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyReserve;