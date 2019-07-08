import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";

export default function SecretPage({ data }) {
  return (
    <SecretLayout>
      <h1>Secret Page</h1>
      <p>You probably should not be here unless you are Sammy.</p>
      <br />
      <SimpleField>
        <div>Build Time:&nbsp;</div>
        <div>{new Date(data.site.buildTime).toString()}</div>
      </SimpleField>
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
  query BuildTimeQuery {
    site {
      buildTime
    }
  }
`;
