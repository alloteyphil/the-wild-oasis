import styled from "styled-components";

const FileInput = styled.input.attrs({ type: "file" })`
  font-size: 1.4rem;
  border-radius: var(--border-radius-sm);

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.8rem 1.2rem;
    margin-right: 1.2rem;
    border-radius: var(--border-radius-sm);
    border: none;
    color: #ffffff;
    background-color: #312e81;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    box-shadow: var(--shadow-sm);

    &:hover {
      background-color: #4338ca;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(49, 46, 129, 0.4);
    }

    &:active {
      transform: translateY(0);
      background-color: #3730a3;
      box-shadow: var(--shadow-sm);
    }
  }
`;

export default FileInput;
