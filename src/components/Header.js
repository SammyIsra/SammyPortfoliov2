import React from "react";
import styled from "styled-components";
import { Link, graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";

//Aditional rules I can't fix w styled components ☹️
import "./Header.css";

const HeaderContainer = styled.header`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const HeaderMask = styled.div`
  margin-left: 0;
  margin-right: 0;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${props =>
    props.dark ? "rgba(0, 0, 0, 0.35)" : "rgba(255, 255, 255, 0.35)"};
`;

const Title = styled.div`
  margin: 2% auto;
  text-transform: uppercase;
  text-align: center;
  padding: 2px 10px 0px 10px;
  margin: 20px;
  font-size: 4.5rem;
  line-height: 4.5rem;
  text-decoration: none;
  color: ${props => (props.dark ? "white" : "black")};
  border: 3px solid ${props => (props.dark ? "white" : "black")};
  &:hover {
    color: ${props => (props.dark ? "black" : "white")};
    border: 3px solid ${props => (props.dark ? "black" : "white")};
    background-color: ${props => (props.dark ? "white" : "black")};
  }
`;

const Subtitle = styled.div`
  font-size: 1.7rem;
  text-decoration: none;
  color: ${props => (props.dark ? "white" : "black")};
`;

const SubtitleItemStyled = styled.span`
  color: inherit;
  text-decoration: inherit;
  background-image: none;
  &:hover {
    text-decoration: underline;
  }
`;

const ArrowDown = styled.div`
  font-weight: 500;
  color: ${props => (props.dark ? "white" : "black")};
  position: absolute;
  bottom: 7px;
  margin-left: auto;
  margin-right: auto;
`;

function SubtitleItem({ to, children }) {
  return (
    <SubtitleItemStyled>
      <Link to={to}>{children}</Link>
    </SubtitleItemStyled>
  );
}

export function Header({ dark, page }) {
  const graphQlQuery = graphql`
    query headerImageQuery {
      allBackgroundImage {
        edges {
          node {
            title
            for
            localImage {
              childImageSharp {
                fluid(maxHeight: 10000) {
                  ...GatsbyImageSharpFluid
                  presentationWidth
                }
              }
            }
          }
        }
      }
    }
  `;

  return (
    <HeaderContainer className="Header">
      <StaticQuery
        query={graphQlQuery}
        render={data => (
          <HeaderImage
            image={randomFromArray(
              data.allBackgroundImage.edges.filter(x => x.node.for === page)
            )}
          />
        )}
      />
      <HeaderMask dark={dark}>
        <Link to="/">
          <Title dark={dark}>Sammy Israwi</Title>
        </Link>
        <Subtitle dark={dark}>
          <SubtitleItem to="/developer">DEVELOPER&nbsp;</SubtitleItem>|
          <SubtitleItem to="/photographer">&nbsp;PHOTOGRAPHER</SubtitleItem>
        </Subtitle>
        <ArrowDown dark={dark}>V</ArrowDown>
      </HeaderMask>
    </HeaderContainer>
  );
}

function HeaderImage({ image }) {
  return image ? (
    <Img
      style={{
        position: "absolute",
        zIndex: 0,
        width: "100%",
        height: "100vh"
      }}
      alt={image.node.title}
      fluid={image.node.localImage.childImageSharp.fluid}
    />
  ) : null;
}

function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
