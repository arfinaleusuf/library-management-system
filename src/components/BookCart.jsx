const BookCart = ({ book }) => {
    return (
        <div className="card bg-base-100 w-full max-w-sm shadow-md border border-base-200 hover:shadow-xl transition-shadow duration-300">

            {/* Book Cover Placeholder */}
            <figure className="h-64 from-primary/20 via-base-200 to-secondary/20 flex items-center justify-center p-6">
                {book.cover_image ? (
                    <img
                        src={book.cover_image}
                        alt={book.title}
                        className="h-full w-full object-cover rounded-lg"
                    />
                ) : (
                    <div className="w-40 h-52 bg-base-100 shadow-lg rounded-md flex flex-col items-center justify-center p-4 text-center border-l-4 border-primary">
                        <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">
                            Book
                        </span>

                        <h3 className="font-bold text-lg leading-tight">
                            {book.title}
                        </h3>

                        <div className="divider my-2"></div>

                        <p className="text-xs text-base-content/60">
                            {book.author}
                        </p>
                    </div>
                )}
            </figure>

            <div className="card-body">
                <div className="flex items-start justify-between gap-2">
                    <h2 className="card-title text-lg">
                        {book.title}
                    </h2>

                    <span className="badge badge-primary badge-outline">
                        {book.category}
                    </span>
                </div>

                <p className="text-sm text-base-content/70 line-clamp-2">
                    {book.description}
                </p>

                <p className="text-sm">
                    <span className="font-semibold">Author:</span>{" "}
                    {book.author}
                </p>

                <div className="flex justify-between items-center mt-2">
                    <div>
                        <p className="text-xl font-bold text-primary">
                            ৳{book.price}
                        </p>
                        <p className="text-xs text-base-content/60">
                            {book.available_copies} copies available
                        </p>
                    </div>

                    <div className="card-actions">
                        <button className="btn btn-primary btn-sm">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookCart;
