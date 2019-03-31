import React from "react";
import styled from "styled-components";
import { graphql } from "gatsby";
import Img from "gatsby-image";

import { Layout } from "../components/Layout";
import { Bio, BioBody, BioTitle } from "../components/Bio";
import { WhiteFont, YellowFont } from "../components/Styles";

export default function PhotographerPage({ data }) {
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

const StyledImg = styled(Img)`
  width: 15rem;
  height: 15rem;
  opacity: 1;
  background-color: white;
  transition: opacity 0.5s;
  &:hover {
    opacity: 0.75;
  }
`;

const PhotoGridStream = styled.div`
  margin: auto;
  max-width: 95%;
  display: grid;
  grid-gap: 0.35rem;
  grid-template-columns: repeat(auto-fit, 15rem);
  @media screen and (min-width: 900px) {
    max-width: 85%;
  }
`;

const PhotoLink = styled.a`
  width: 15rem;
  height: 15rem;
  display: inline-block;
  background-image: none;
  overflow: hidden;
  object-fit: cover;
`;

function PhotoStream({ photos }) {
  return (
    <PhotoGridStream>
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
    </PhotoGridStream>
  );
}

/**
 * Component for displaying a single photo of the photo stream
 */
function PhotoItem({ sharpPhoto, address, title }) {
  return (
    <PhotoLink target="_blank" href={address}>
      <StyledImg fluid={sharpPhoto.childImageSharp.fluid} alt={title} />
    </PhotoLink>
  );
}

export const query = graphql`
  query PhotographerPageQuery {
    allFlickrImage(limit: 24) {
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
          localImage {
            id
            childImageSharp {
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
