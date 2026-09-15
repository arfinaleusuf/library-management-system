import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { baseurl } from "../../services/BaseUrl";
import { AuthContext } from "../../context/AuthProvider";
import toast from "react-hot-toast";

const EditBook = () => {
    const { id } = useParams();
    const { accessToken } = useContext(AuthContext);
    const [bookDetails, setBookDetails] = useState(null);

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [totalCopies, setTotalCopies] = useState('');
    const [availableCopies, setAvailableCopies] = useState('');

    useEffect(() => {
        if (!id || !accessToken) return;

        fetch(`${baseurl}/books/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setBookDetails(data);
            })
            .catch(err => console.log(err));
    }, [id, accessToken]);

    useEffect(() => {
        if (bookDetails) {
            setTitle(bookDetails?.title || '');
            setAuthor(bookDetails?.author || '');
            setCategory(bookDetails?.category || '');
            setDescription(bookDetails?.description || '');
            setPrice(bookDetails?.price || '');
            setTotalCopies(bookDetails?.total_copies || '');
            setAvailableCopies(bookDetails?.available_copies || '');
        }
    }, [bookDetails]);

    const handleUpdate = async () => {
        const formData = {
            title,
            author,
            category,
            description,
            price,
            total_copies: totalCopies,
            available_copies: availableCopies
        }

        const res = await fetch(`${baseurl}/admin/update_book/${id}`,{
            method: "PUT",
            headers:{
                Authorization : `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        const data = await res.json()
        toast.success(data.message)
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">Edit Book</h2>

            <div className="space-y-4">

                {/* Title */}
                <div>
                    <label className="label">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Author */}
                <div>
                    <label className="label">Author</label>
                    <input
                        type="text"
                        name="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="label">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="label">Description</label>
                    <textarea
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="textarea textarea-bordered w-full"
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="label">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Total Copies */}
                <div>
                    <label className="label">Total Copies</label>
                    <input
                        type="number"
                        name="total_copies"
                        value={totalCopies}
                        onChange={(e) => setTotalCopies(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Available Copies */}
                <div>
                    <label className="label">Available Copies</label>
                    <input
                        type="number"
                        name="available_copies"
                        value={availableCopies}
                        onChange={(e) => setAvailableCopies(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </div>

                <button onClick={handleUpdate} className="btn btn-primary w-full">
                    Update Book
                </button>

            </div>
        </div>
    );
};

export default EditBook;