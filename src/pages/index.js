import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { Layout } from "../components/Layout";

const IndexPage = () => (
  <Layout theme="light" page="home">
    <IndexBaseContainer>
      <IndexTitle>Sammy Is A...</IndexTitle>
      <IndexBioBody>
        A <Link to="/developer">Software Developer</Link>, a{" "}
        <Link to="/photographer">Photographer</Link>, a UCF Knight, a casual
        teacher and student, and sometimes a speaker too. <br />
        If you'd like to contact me, feel free to DM me <a href="https://twitter.com/SammyIs_Me">@SammyIs_Me</a>. <br />
        You can also get my resume from{" "}
        <a href="https://drive.google.com/file/d/0B1ouby1hW-sjSDdZSFYtUFB1TVE/view?usp=sharing">
          here
        </a>{" "}
        if that's what you're looking for!
      </IndexBioBody>
    </IndexBaseContainer>
  </Layout>
);

const IndexBaseContainer = styled.div`
  max-width: 75%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  @media (max-width: 1000px) {
    max-width: 85%;
  }
  @media (max-width: 650px) {
    max-width: 95%;
  }
`;

const IndexTitle = styled.h2`
  font-size: 3rem;
  line-height: 3rem;
`;

const IndexBioBody = styled.p`
  font-size: 1.4rem;
  line-height: 1.75rem;
`;

export default IndexPage;
