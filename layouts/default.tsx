import Head from "next/head";
import styled from "styled-components";

import styles from "../styles/Home.module.css";

const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template: "header" 15% "content" 1fr "footer" 10% / 1fr;

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
  font-size: 2rem;
`;

const Content = styled.main`
  grid-area: content;
  flex-direction: column;
`;

const Footer = styled.footer`
  grid-area: footer;
`;

interface LayoutProps {
  children: React.ReactNode;
}

function DefaultLayout({ children }: LayoutProps) {
  return (
    <Layout id="foo2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header>Workout buddy</Header>
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
