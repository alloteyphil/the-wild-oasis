import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 1rem 1.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.6rem 3rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.4rem 3rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: #ffffff;
    background-color: #312e81;
    transition: all 0.2s ease-in-out;

    &:hover:not(:disabled) {
      background-color: #4338ca;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(49, 46, 129, 0.4);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
      background-color: #3730a3;
      box-shadow: var(--shadow-sm);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);
    transition: all 0.2s ease-in-out;

    &:hover:not(:disabled) {
      background-color: var(--color-grey-50);
      border-color: var(--color-grey-300);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `,
  danger: css`
    color: #fff;
    background-color: var(--color-red-700);
    transition: all 0.2s ease-in-out;

    &:hover:not(:disabled) {
      background-color: var(--color-red-800);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(185, 28, 28, 0.4);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `,
  accent: css`
    color: #ffffff;
    background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
    transition: all 0.2s ease-in-out;

    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #0891b2 0%, #0e7490 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(6, 182, 212, 0.4);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
      background: linear-gradient(135deg, #0e7490 0%, #155e75 100%);
      box-shadow: var(--shadow-sm);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `,
};

const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  font-weight: 500;

  ${(props) => sizes[props.size]}
  ${(props) => variations[props.variation]}
`;

Button.defaultProps = {
  variation: "primary",
  size: "medium",
};

export default Button;
