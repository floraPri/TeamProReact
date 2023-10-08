import styled from "styled-components";
import APIService from "@/APIService";
import { useEffect, useState } from "react";
import axios from "axios";

const Help = styled.div`
color: blue;
`

export default function FISRT (){
    const [hello, setHello] = useState('!')

    console.log(hello)
    useEffect(() => {
        axios.get('http://localhost:8081/test/first')
        .then(response => setHello(response.data))
        .catch(error => console.log(error))
    }, []);

    return(
        <Help>
            {hello}
        </Help>
    )
}