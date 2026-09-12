import { useEffect, useState } from "react";
import { baseurl } from "../services/BaseUrl";
import BookCart from "../components/BookCart";


const BrowesBooks = () => {

    const [books, setBooks] = useState([])

    useEffect(() => {
        fetch(`${baseurl}/books/all`)
            .then(res => res.json())
            .then(data => setBooks(data))
    }, [])

    return (
        <div>
            <div className="grid grid-cols-4 p-12 gap-12">
                {
                    books.map(book => <BookCart book={book}></BookCart> )
                }
            </div>
        </div>
    );
};

export default BrowesBooks;