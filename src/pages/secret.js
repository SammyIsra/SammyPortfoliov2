import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";

import { Experiences } from "../components/Experiences";
import { Red, Blue, Bold } from "../components/Styles";

export default function SecretPage({ data }) {
  return (
    <SecretLayout>
      <h1>Secret Page</h1>
      <p>You probably should not be here unless you are Sammy.</p>
      <br />
      <SimpleField>
        <div>Build Time:&nbsp;</div>
        <div>
          <Bold>{new Date(data.site.buildTime).toString()}</Bold>
        </div>
      </SimpleField>
      <SimpleField>
        <div>Total Posts:&nbsp;</div>
        <Blue>
          <Bold>{data.allMarkdownRemark.edges.length}</Bold>
        </Blue>
      </SimpleField>
      <SimpleField>
        <div>Unpublished Posts:&nbsp;</div>
        <Red>
          <Bold>
            {
              data.allMarkdownRemark.edges.filter(
                edge => !edge.node.frontmatter.published
              ).length
            }
          </Bold>
        </Red>
      </SimpleField>
      <Experiences filterPrivate={false} verbose={true} />
    </SecretLayout>
  );
}

const SecretLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

const SimpleField = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  :first-child {
    color: red;
  }
`;

export const query = graphql`
  query SecretPageQuery {
    site {
      buildTime
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          frontmatter {
            published
          }
        }
      }
    }
  }
`;
