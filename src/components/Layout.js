import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import { graphql, StaticQuery } from "gatsby";

import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout(props) {
  const { children, theme, page } = props;

  const graphqlQuery = graphql`
    query IndexLayoutQuery {
      site {
        siteMetadata {
          title
          description
          tags
        }
      }
    }
  `;

  return (
    <Website>
      <StaticQuery
        query={graphqlQuery}
        render={({ site: { siteMetadata } }) => (
          <>
            <Helmet
              title={siteMetadata.title}
              meta={[
                {
                  name: "description",
                  content: siteMetadata.description
                },
                {
                  name: "keywords",
                  content: siteMetadata.tags.join(", ")
                }
              ]}
            />
            <Header page={page} dark={theme === "dark"} />
            <WebsiteContent dark={theme === "dark"}>{children}</WebsiteContent>
            <Footer dark={theme === "dark"} />
          </>
        )}
      />
    </Website>
  );
}

const Website = styled.div`
  display: flex;
  flex-flow: column;
  min-height: 100vh;
`;

const WebsiteContent = styled.div`
  flex: 1;
  background-color: ${props => (props.dark ? "rgb(51,51,51)" : "white")};
  padding-top: 1.5rem;
`;
