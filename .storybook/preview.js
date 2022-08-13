import { addDecorator } from "@storybook/react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { theme } from "../src/themes";
import * as NextImage from "next/image";
import { objectExpression } from "@babel/types";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const GlobalStyle = createGlobalStyle`
  html,
  body,
  textarea {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }
  a {
    transition: 0.25s;
    text-decoration: none;
    color: #000000;
  }
  
  * {
    box-sizing: border-box;
  }
`;

addDecorator((story) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {story()}
  </ThemeProvider>
));

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) =>
    typeof props.src === "string" ? (
      <OriginalNextImage {...props} unoptimized blurDataURL={props.src} />
    ) : (
      <OriginalNextImage {...props} unoptimized />
    ),
});

Object.defineProperty(NextImage, "__esModule", {
  configurable: true,
  value: true,
});
