import { useEffect, useState } from "react";
import { baseurl } from "../services/BaseUrl";

const FeatureBook = () => {

    const[featureBooks, setFeatureBooks] = useState([])

    useEffect(()=>{
        fetch(`${baseurl}/books/all`)
        .then(res => res.json())
        .then(data =>setFeatureBooks(data))
    },[])

    return (
        <div>
            
        </div>
    );
};

export default FeatureBook;