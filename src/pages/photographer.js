import React from "react";
import styled from "styled-components";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import Masonry from "react-masonry-component";

import { Layout } from "../components/Layout";
import { Bio, BioBody, BioTitle } from "../components/Bio";
import { WhiteFont, YellowFont } from "../components/Styles";

function PhotographerPage({ data }) {
  const photos = data.allFlickrImage.edges.map(x => x.node);
  const bioText =
    "Even though I am a developer by trade, I have an intense passion for photography. " +
    "My main subject is always people, which is why I enjoy portrait photography over any other. " +
    "That doesn't mean that I don't enjoy other kinds of photography! " +
    "I'm all for trying new styles and formats, you never know what your next passion will be.";
  return (
    <Layout theme="dark" page="photographer">
      <Bio>
        <BioTitle>
          <YellowFont>Sammy is a... Photographer</YellowFont>
        </BioTitle>
        <BioBody>
          <WhiteFont>{bioText}</WhiteFont>
        </BioBody>
      </Bio>
      <PhotoStream photos={photos} />
    </Layout>
  );
}

export default PhotographerPage;

const PhotoStreamContainer = styled.div`
  line-height: 0;
  width: 85%;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  column-count: 3;
  column-gap: 0px;
  @media (max-width: 1200px) {
    column-count: 2;
  }
  @media (max-width: 600px) {
    column-count: 1;
  }
`;

const PhotoMasonryStream = styled(Masonry)`
  width: 85%;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
`;

const StyledImg = styled(Img)`
  /* max-width: 100%; */
  /* max-height: 100%; */
  opacity: 1;
  margin-bottom: 0;
  background-color: white;
  transition: opacity 0.5s;
  &:hover {
    opacity: 0.75;
  }
`;

const PhotoFlexStream = styled.div`
  margin: auto;
  max-width: 95%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: stretch;
  align-content: flex-start;
  @media screen and (min-width: 900px) {
    max-width: 85%;
  }
`;

const PhotoLink = styled.a`
  display: inline-block;
  background-image: none;
  max-width: 100%;
  width: auto;
  height: auto;
  margin-right: 0.4rem;
  margin-bottom: 0.4rem;
`;

function PhotoStream({ photos }) {
  return (
    <PhotoFlexStream>
      {photos.map(x => (
        <PhotoItem
          key={x.id}
          id={x.id}
          src={x.url_m}
          address={x.address}
          title={x.title}
          sharpPhoto={x.localImage}
        />
      ))}
    </PhotoFlexStream>
  );
}

/**
 * Component for displaying a single photo of the photo stream
 */
function PhotoItem({ sharpPhoto, address, title }) {
  return (
    <StyledImg
      fluid={sharpPhoto.childImageSharp.fixed}
      alt={title}
      style={{ display: "block" }}
    />
    // <PhotoLink target="_blank" href={address}>
    //   {/* <StyledImg
    //     fixed={sharpPhoto.childImageSharp.fixed}
    //     alt={title}
    //     style={{ display: "block" }}
    //   /> */}
    // </PhotoLink>
  );
}

export const query = graphql`
  query PhotographerPageQuery {
    allFlickrImage {
      edges {
        node {
          id
          address
          title
          url_m
          height_m
          width_m
          url_l
          height_l
          width_l
          title
          localImage {
            id
            childImageSharp {
              fixed(height: 300) {
                ...GatsbyImageSharpFixed
              }
              fluid(maxHeight: 500) {
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
