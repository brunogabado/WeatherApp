import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&family=Pacifico&family=Quicksand:wght@400;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&family=Playfair+Display&display=swap');

html {
    margin: 0;
    padding: 0;
    background-color: #d8f2ff;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: #d8f2ff;
  };

  h1, h2, h3{
    font-family: 'Quicksand', sans-serif;
  }

 button, p, div{
  font-family: 'Noto Sans', sans-serif;
 }

`;

export default GlobalStyles;

// font-family: 'Noto Sans', sans-serif;
// font-family: 'Playfair Display', serif;

// font-family: 'Comfortaa', sans-serif;
// font-family: 'Pacifico', cursive;
// font-family: 'Quicksand', sans-serif;


