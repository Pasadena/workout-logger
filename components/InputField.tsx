import React from "react";
import styled from "styled-components";

const Label = styled.label`
  font-weight: 600;
`;
export const Input = styled.input`
  margin-left: 0.5rem;
  padding: 0.25rem;
  outline: none;
  border: none;
  border-bottom: 2px solid green;
  font-size: 1.1rem;
  &:focus {
    border-bottom: 2px solid blue;
  }
`;

interface Props {
  label: string;
  className?: string;
  type?: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  inputProps: React.HTMLProps<HTMLInputElement>;
}

const InputField = ({
  label,
  className,
  type = "text",
  inputProps = {},
  onChange,
}: Props) => {
  return (
    <Label className={className}>
      {label}:<Input type={type} onChange={onChange} {...inputProps}></Input>
    </Label>
  );
};

export default InputField;
