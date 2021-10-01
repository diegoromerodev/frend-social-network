import { createGlobalStyle } from "styled-components";
import { dark } from "./colors";

export default createGlobalStyle`
    :root {
        font-size: 15px;
        @media only screen and (-webkit-min-device-pixel-ratio: 3),
                    only screen and (min--moz-device-pixel-ratio: 3),
                    only screen and (-o-min-device-pixel-ratio: 3/1),
                    only screen and (min-device-pixel-ratio: 3) {
            font-size: 29px;
        }
    }
    *, *::before, *::after {
        margin: 0;
        padding: 0;
        outline: none;
        border: none;
        box-sizing: border-box;
    }
    body {
        background-color: ${dark};
        * {
            font-family: Rubik;
        }
        *::placeholder {
            font-weight: lighter;
        }
        overflow-x: hidden;
    }
`;
