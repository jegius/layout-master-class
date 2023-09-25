export default `
    <style>
        @import url('../common.css');
        
        input {
            margin: 0;
            padding: 0;
            border: none;
            outline: none;
            background: none; /* убирает серую подсветку при активации в некоторых браузерах */
            -webkit-appearance: none; /* убирает стили браузера в Chrome и Safari */
            -moz-appearance: none; /* убирает стили браузера в Firefox */
            appearance: none; /* убирает стили браузера для остальных */
        }
        
        .header__contact-button {
            text-transform: uppercase;
            color: var(--white);
            background-color: var(--blue);
            padding: 1.5rem 2.5rem;
            border-radius: 10rem;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 0 0 0;
            transform: scale(1);
            transition: transform .2s ease-in-out, box-shadow .2s ease-in-out;
        }
        
        .header__contact-button:hover {
            transform: scale(.95);
            box-shadow: 0 0 1rem var(--blue);
        }
        
    </style>
`;
