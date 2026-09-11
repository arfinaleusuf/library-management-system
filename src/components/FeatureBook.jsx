import { useEffect, useState } from "react";
import { baseurl } from "../services/BaseUrl";
import BookCart from "./BookCart";

const FeatureBook = () => {

    const [featureBooks, setFeatureBooks] = useState([])

    useEffect(() => {
        fetch(`${baseurl}/books/all`)
            .then(res => res.json())
            .then(data => setFeatureBooks(data))
    }, [])

    return (
        <div>
            <h1 className="text-center text-4xl py-16 font-bold">Our Featured Books</h1>
            <div className="grid grid-cols-3 gap-12 px-24">
                {
                    featureBooks.slice(0,3).map(book => <BookCart book={book} key={book.id}></BookCart>)
                }
            </div>
        </div>
    );
};

export default FeatureBook;