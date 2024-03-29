import styled from "styled-components";

const SidebarButton = styled.button<{ selected?: boolean }>`
  width: 100%;
  cursor: pointer;
  border: none;
  padding: 12px 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  background-color: ${(props) => (props.selected ? "#232323" : "transparent")};
  color: ${(props) => props.theme.color.white};

  svg {
    color: ${(props) => props.selected && props.theme.color.primary};
    opacity: ${(props) => (props.selected ? 1 : 0.4)};
  }

  &:hover {
    background-color: ${(props) => !props.selected && "#383838"};
    svg {
      opacity: 1;
    }
  }
`;

const CollapseButton = styled.button`
  cursor: pointer;
  -webkit-appearance: none;
  display: flex;
  align-items: center;
  padding: 0;
  background: transparent;
  font-size: 0.8rem;
  border: none;
  line-height: 1;
  margin: 0;
  opacity: 0.8;

  &:hover {
    color: white;

    svg {
      stroke: white;
    }
  }

  label {
    padding-left: 10px;
    color: #d0d0d0;
  }
`;

const ProjectTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  padding: 0.5rem 0 0.5rem 1rem;

  svg {
    color: #d0d0d0;
  }
`;

const Form = styled.form`
  width: calc(100% - 55px);
`;

const CategoryItem = styled.div<{ selected?: boolean }>`
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

const CategoryForm = styled.form`
  display: flex;
  border-radius: 0.3rem;
  padding: 0.75rem;
  outline: none;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  width: 100%;
  max-width: 100%;

  &:focus {
    outline: 0;
    border: 1px solid lighten(${(props) => props.theme.color.primary}, 15%);
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  max-height: 60%;
  overflow-y: auto;
`;

export {
  SidebarButton,
  CollapseButton,
  ProjectTitle,
  Form,
  CategoryItem,
  CategoryForm,
  List,
};
