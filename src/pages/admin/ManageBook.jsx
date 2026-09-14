
import { useContext, useEffect, useState } from "react";
import { baseurl } from "../../services/BaseUrl";
import { AuthContext } from "../../context/AuthProvider";
import toast from "react-hot-toast";


const ManageBook = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [books, setBooks] = useState([])
    const { accessToken } = useContext(AuthContext)

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        category: "",
        description: "",
        price: 0,
        total_copies: 1
    });

    useEffect(() => {
        fetch(`${baseurl}/books/all`)
            .then(res => res.json())
            .then(data => setBooks(data))
    }, [])

    console.log(books)

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]:
                name === "price" || name === "total_copies"
                    ? Number(value)
                    : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(`${baseurl}/admin/create_book`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })

        const data = await res.json();

        toast.success(data.message)

        setIsModalOpen(false);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Book</h2>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn btn-primary"
                >
                    Add Book
                </button>
            </div>
            {/* Book Table */}
            <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Book</th>
                            <th>Author</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Copies</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {books.map((book, index) => (
                            <tr key={book.id}>
                                <td>{index + 1}</td>

                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12 bg-base-200 flex items-center justify-center">
                                                {book.cover_image ? (
                                                    <img
                                                        src={book.cover_image}
                                                        alt={book.title}
                                                    />
                                                ) : (
                                                    <span className="text-xs">
                                                        No Image
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="font-bold">
                                                {book.title}
                                            </div>

                                            <div className="text-sm opacity-60">
                                                ID: {book.id}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td>{book.author}</td>

                                <td>
                                    <span className="badge badge-outline">
                                        {book.category}
                                    </span>
                                </td>

                                <td>৳{book.price}</td>

                                <td>
                                    {book.available_copies} / {book.total_copies}
                                </td>

                                <td>
                                    <div className="flex gap-2">
                                        <button className="btn btn-sm btn-info">
                                            Edit
                                        </button>

                                        <button className="btn btn-sm btn-error">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="bg-base-100 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-5">
                                <h3 className="text-xl font-bold">
                                    Add New Book
                                </h3>

                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="btn btn-sm btn-circle btn-ghost"
                                >
                                    ✕
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Title */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Title</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Enter book title"
                                        className="input input-bordered w-full"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Author */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Author</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="author"
                                        placeholder="Enter author name"
                                        className="input input-bordered w-full"
                                        value={formData.author}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Category */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Category</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="category"
                                        placeholder="Enter book category"
                                        className="input input-bordered w-full"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Description */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Description</span>
                                    </label>
                                    <textarea
                                        name="description"
                                        placeholder="Enter book description"
                                        className="textarea textarea-bordered w-full"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="3"
                                    ></textarea>
                                </div>

                                {/* Price */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Price</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        placeholder="Enter price"
                                        className="input input-bordered w-full"
                                        value={formData.price}
                                        onChange={handleChange}
                                        min="0"
                                        required
                                    />
                                </div>

                                {/* Total Copies */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Total Copies
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        name="total_copies"
                                        placeholder="Enter total copies"
                                        className="input input-bordered w-full"
                                        value={formData.total_copies}
                                        onChange={handleChange}
                                        min="1"
                                        required
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="flex justify-end gap-3 pt-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="btn btn-ghost"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Add Book
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageBook;
