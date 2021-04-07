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

const commonButtonStyles = (type: ButtonType) => `
  outline: none;
  border: none;
  background-color: ${typeToColor(type)};
  color: white;
  font-weight: 500;
  box-shadow: 0px 1px 2px 1px ${typeToColor(type)};
  transition: background-color 0.2s ease-in;
  &:hover {
    cursor: pointer;
    background-color: darkgreen;
  }
`;

const SquareButton = styled.button`
  ${(props) => commonButtonStyles(props.type)};
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;

const BaseButton = styled.button`
  ${(props) => commonButtonStyles(props.type)};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 1rem;
`;

interface Props {
  label: string;
  type?: ButtonType;
  onClick: () => void;
}

interface IconButtonProps {
  icon: () => React.ReactNode;
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

const PrimaryButton = (props: Props) => (
  <Button {...props} type={ButtonType.PRIMARY} />
);

const DangerButton = (props: Props) => (
  <Button {...props} type={ButtonType.DANGER} />
);

const IconButton = ({ onClick, type, icon }: IconButtonProps) => (
  <SquareButton onClick={onClick} type={ButtonType.PRIMARY}>
    {icon()}
  </SquareButton>
);

export { Button, PrimaryButton, DangerButton, IconButton };
