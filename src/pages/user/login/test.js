import { useState, useEffect } from "react";
import axios from "axios";

export default function test() {
    const [hello, setHello] = useState('')

    useEffect(() => {
        axios.get('http://localhost:8081')
        .then(
            response => console.log(response.data)
        )
        .catch(error => console.log(error))
    }, []);

    return (
        <div>
            {hello}
        </div>
    )
}