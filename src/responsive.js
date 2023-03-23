import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 480px) {
      ${props}
    }
  `;
};

export const tablet = (props) => {
  return css`
    @media only screen and (min-width: 481px) and (max-width: 767px) {
      ${props}
    }
  `;
};

export const desktop = (props) => {
  return css`
    @media only screen and (min-width: 768px) and (max-width: 991px) {
      ${props}
    }
  `;
};

export const largeDesktop = (props) => {
  return css`
    @media only screen and (min-width: 992px) and (max-width: 1199px) {
      ${props}
    }
  `;
};

export const extraLargeDesktop = (props) => {
  return css`
    @media only screen and (min-width: 1200px) {
      ${props}
    }
  `;
};
