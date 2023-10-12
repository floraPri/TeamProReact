import { createGlobalStyle } from "styled-components";


const ResetStyles = createGlobalStyle`
    a {
        text-decoration: none;
        color: #000;
    }

    h1,h2,h3,h4,h5,h6,p,span {
        padding: 0;
        margin: 0;
        font-weight: normal;
    }

    ol, ul {
        list-style:none;
        padding: 0;
        margin: 0;
    }
`;

export default ResetStyles;