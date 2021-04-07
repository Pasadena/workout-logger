import Head from "next/head";
import styled from "styled-components";
import { FiPlus, FiSettings } from "react-icons/fi";

import Link from "components/Link";

import styles from "../styles/Home.module.css";
import { IconType } from "react-icons/lib";
import { useRouter } from "next/router";

const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template: "header" 20% "content" 1fr "footer" 10% / 1fr;

  > * {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Header = styled.header`
  grid-area: header;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;

  > * {
    flex: 1;
  }
`;

const TitleWrapper = styled.h1`
  margin: 0;
  font-size: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
`;

const Title = styled.span`
  &:hover {
    cursor: pointer;
  }
`;

const Links = styled.div`
  display: flex;
  align-items: flex-end;

  > * {
    margin-right: 2rem;
  }
`;

const Content = styled.main`
  grid-area: content;
  flex-direction: column;
`;

const Footer = styled.footer`
  grid-area: footer;
`;

const appLinks: {
  [key: string]: { href: string; label: string; Icon?: IconType };
} = {
  create: {
    href: "/create",
    label: "New workout",
    Icon: FiPlus,
  },
  admin: {
    href: "/admin",
    label: "Admin",
    Icon: FiSettings,
  },
};

interface LayoutProps {
  children: React.ReactNode;
}

function DefaultLayout({ children }: LayoutProps) {
  const router = useRouter();
  return (
    <Layout id="foo2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header>
        <TitleWrapper onClick={() => router.push("/")}>
          <Title>Workout buddy</Title>
        </TitleWrapper>
        <Links>
          {Object.keys(appLinks).map((key: string) => {
            const link = appLinks[key];
            return (
              <Link
                key={key}
                href={link.href}
                label={link.label}
                icon={() => {
                  const Icon = link.Icon;
                  return <Icon />;
                }}
              />
            );
          })}
        </Links>
      </Header>
      <Content>{children}</Content>
      <Footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </Footer>
    </Layout>
  );
}

export default DefaultLayout;
