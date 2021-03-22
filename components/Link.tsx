import styled from "styled-components";
import NextLink, { LinkProps } from "next/link";

const AppLink = styled.a`
  display: inline-block;
  width: unset;
  background-color: green;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  font-size: 1rem;
  box-shadow: 0px 1px 2px 1px green;
  transition: background-color 0.2s ease-in;
  &:hover {
    cursor: pointer;
    background-color: darkgreen;
  }
`;

interface Props extends LinkProps {
  label: string;
}

const Link = (props: Props) => (
  <NextLink {...props}>
    <AppLink>{props.label}</AppLink>
  </NextLink>
);

export default Link;
