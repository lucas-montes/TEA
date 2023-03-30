import styled from "styled-components";


export const Form = styled.form`
  width: calc(100% - 55px);
`;

export const Item = styled.div<{ selected?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 15px;
  color: #d0d0d0;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#232323" : "transparent")};

  .icon {
    color: ${(props) => props.selected && props.theme.color.primary};
    min-width: 16px;
  }

  div:first-child {
    max-width: 90%;
  }
`;