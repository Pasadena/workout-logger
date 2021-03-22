import React from "react";
import styled from "styled-components";

export enum ButtonType {
  SECONDARY,
  PRIMARY,
  DANGER,
}

const typeToColor = (type: ButtonType) => {
  if (type === ButtonType.PRIMARY) {
    return "green";
  } else if (type === ButtonType.DANGER) {
    return "red";
  }
  return "lightgrey";
};

const BaseButton = styled.button`
  outline: none;
  border: none;
  background-color: ${(props) => typeToColor(props.type)};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  box-shadow: 0px 1px 2px 1px ${(props) => typeToColor(props.type)};
  transition: background-color 0.2s ease-in;
  &:hover {
    cursor: pointer;
    background-color: darkgreen;
  }
`;

interface Props {
  label: string;
  type?: ButtonType;
  onClick: () => void;
}

const Button = ({ label, type = ButtonType.SECONDARY, onClick }: Props) => {
  return (
    <BaseButton onClick={onClick} type={type}>
      {label}
    </BaseButton>
  );
};

const PrimaryButton = (props) => (
  <Button {...props} type={ButtonType.PRIMARY} />
);

const DangerButton = (props) => <Button {...props} type={ButtonType.DANGER} />;

export { Button, PrimaryButton, DangerButton };
