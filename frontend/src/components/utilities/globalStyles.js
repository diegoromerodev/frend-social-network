import { createGlobalStyle } from "styled-components";
import { dark } from "./colors";

export default createGlobalStyle`
    :root {
        font-size: 15px;
        .mobile-only { display: none; }
        @media only screen and (-webkit-min-device-pixel-ratio: 3),
                    only screen and (min--moz-device-pixel-ratio: 3),
                    only screen and (-o-min-device-pixel-ratio: 3/1),
                    only screen and (min-device-pixel-ratio: 3) {
            font-size: 29px;
            .mobile-last {
                order: 1;
            }
            .mobile-hidden {
                display: none;
            }
            .mobile-only {
                display: block;
            }
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
    .up-motion {
        opacity: 0;
        transform: translateY(100%);
        animation: up-motion 1s ease-out forwards;
    }
    @keyframes up-motion {
        from {
            opacity: 0;
            transform: translateY(100%);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    .pop-on {
        animation: pop-on 0.1s cubic-bezier(0.09, 0.59, 0.18, 1.19) forwards;
    }
    @keyframes pop-on {
        from {
            transform: scale(0);
        }
        to {
            transform: scale(1);
        }
    }
`;
