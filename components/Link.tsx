import styled from "styled-components";
import NextLink, { LinkProps } from "next/link";
import { FiArrowLeft } from "react-icons/fi";

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 0.5rem;
  transition: color 0.2s ease;
  color: white;
  &:hover {
    cursor: pointer;
    color: lightblue;
  }
  > svg {
    margin-right: 0.5rem;
  }
`;

const AppLink = styled.a`
  display: inline-block;
  width: unset;

  font-weight: 500;
  font-size: 1rem;
`;

interface Props extends LinkProps {
  label: string;
  className?: string;
  icon?: () => React.ReactNode;
}

const Link = (props: Props) => {
  return (
    <NextLink {...props}>
      <LinkContainer className={props.className}>
        {props.icon && props.icon()}
        <AppLink>{props.label}</AppLink>
      </LinkContainer>
    </NextLink>
  );
};

export const BackLink = (props: LinkProps) => (
  <NextLink {...props}>
    <FiArrowLeft size={36} />
  </NextLink>
);

export default Link;
