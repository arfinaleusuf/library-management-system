import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { baseurl } from "../services/BaseUrl";
import { AuthContext } from "../context/AuthProvider";
import toast from "react-hot-toast";

const BookDetails = () => {
    const { id } = useParams();
    const [bookDetails, setBookDetails] = useState(null)
    const { accessToken } = useContext(AuthContext)

    const handleReserve = async ()=> {
        const res = await fetch(`${baseurl}/reserve/${id}`,{
            method: "POST",
            headers: {
                Authorization : `Bearer ${accessToken}`
            }
        })

        const data = await res.json();
        if(data){
            toast.success(data.message)
        }
    }

    useEffect(() => {
        if (!id) return;
        fetch(`${baseurl}/books/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => setBookDetails(data))
            .catch(err => console.log(err))
    }, [id, accessToken])

    if (!bookDetails) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 py-12 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="card lg:card-side bg-base-100 shadow-xl overflow-hidden">

                    {/* Book Cover */}
                    <figure className="lg:w-2/5 bg-base-300 flex items-center justify-center p-8">
                        {bookDetails?.cover_image ? (
                            <img
                                src={bookDetails?.cover_image}
                                alt={bookDetails?.title}
                                className="w-full max-w-sm h-96 object-cover rounded-lg shadow-md"
                            />
                        ) : (
                            <div className="w-full max-w-sm h-96 bg-neutral text-neutral-content rounded-lg flex items-center justify-center text-center p-6">
                                <div>
                                    <div className="text-6xl mb-4">📚</div>
                                    <p className="text-xl font-bold">
                                        {bookDetails?.title}
                                    </p>
                                    <p className="mt-2 opacity-70">
                                        No Cover Available
                                    </p>
                                </div>
                            </div>
                        )}
                    </figure>

                    {/* Book Information */}
                    <div className="card-body lg:w-3/5 p-8">

                        <div className="badge badge-primary mb-2">
                            {bookDetails?.category}
                        </div>

                        <h1 className="text-4xl font-bold mb-2">
                            {bookDetails?.title}
                        </h1>

                        <p className="text-lg text-base-content/70 mb-6">
                            By{" "}
                            <span className="font-semibold">
                                {bookDetails?.author}
                            </span>
                        </p>

                        <div className="divider"></div>

                        <h2 className="text-xl font-semibold mb-3">
                            About This Book
                        </h2>

                        <p className="text-base-content/70 leading-7 mb-6">
                            {bookDetails?.description || "No description available."}
                        </p>

                        {/* Price & Availability */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-base-200 p-4 rounded-lg">
                                <p className="text-sm text-base-content/60">
                                    Price
                                </p>
                                <p className="text-2xl font-bold text-primary">
                                    ৳{bookDetails?.price}
                                </p>
                            </div>

                            <div className="bg-base-200 p-4 rounded-lg">
                                <p className="text-sm text-base-content/60">
                                    Availability
                                </p>
                                <p
                                    className={`text-xl font-bold ${bookDetails?.available_copies > 0
                                        ? "text-success"
                                        : "text-error"
                                        }`}
                                >
                                    {bookDetails?.available_copies > 0
                                        ? `${bookDetails?.available_copies} Available`
                                        : "Out of Stock"}
                                </p>
                            </div>
                        </div>

                        <div className="text-sm text-base-content/60 mb-6">
                            Total Copies:{" "}
                            <span className="font-semibold text-base-content">
                                {bookDetails?.total_copies}
                            </span>
                        </div>

                        {/* Reserve Button */}
                        <div className="card-actions">
                            <button
                                onClick={handleReserve}
                                className="btn btn-primary btn-lg w-full"
                            >
                                Reserve
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;