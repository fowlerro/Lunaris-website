import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  html, body {
    font-family: 'Sora', sans-serif;
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) => theme.colors.background.primary};
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
`;
