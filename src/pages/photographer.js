import React from "react";
import styled from "styled-components";
import { graphql } from "gatsby";

import { Layout } from "../components/Layout";

function PhotographerPage({ data }) {
  const photos = data.allFlickrImage.edges.map(x => x.node);
  const bioText =
    "Even though I am a developer by trade, I have an intense passion for photography. " +
    "My main subject is always people, which is why I enjoy portrait photography over any other. " +
    "That doesn't mean that I don't enjoy other kinds of photography! " +
    "I'm all for trying new styles and formats, you never know what your next passion will be.";
  return (
    <Layout theme="dark" page="photographer">
      <PhotographerBody>
        <Bio>
          <BioTitle>Sammy is a... Photographer</BioTitle>
          <BioBody>{bioText}</BioBody>
        </Bio>
        <PhotoStream photos={photos} />
      </PhotographerBody>
    </Layout>
  );
}

export default PhotographerPage;

const PhotographerBody = styled.div`
  background-color: rgb(51, 51, 51);
`;

const PhotoStreamContainer = styled.div`
  line-height: 0;
  width: 85%;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  column-count: 3;
  column-gap: 0px;
  @media (max-width: 1000px) {
    column-count: 2;
  }
  @media (max-width: 600px) {
    column-count: 1;
  }
`;

const PhotoItemStyled = styled.img`
  max-width: 100%;
  width: 100%;
  opacity: 1;
  margin-bottom: 0;
  background-color: white;
  transition: opacity 0.5s;
  &:hover {
    opacity: 0.75;
  }
`;

const PhotoLink = styled.a`
  background-image: none;
`;

const Bio = styled.div`
  width: 75%;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;

const BioTitle = styled.h2`
  color: rgb(255, 204, 0);
  font-size: 3rem;
  line-height: 3rem;
`;

const BioBody = styled.p`
  color: white;
  font-size: 1.75rem;
  line-height: 1.75rem;
`;

function PhotoStream({ photos }) {
  return (
    <PhotoStreamContainer>
      {photos.map(x => (
        <PhotoItem
          key={x.id}
          id={x.id}
          src={x.url_m}
          address={x.address}
          title={x.title}
        />
      ))}
    </PhotoStreamContainer>
  );
}

function PhotoItem({ src, address, title }) {
  //const linkToOriginal = `https://www.flickr.com/photos/${owner}/${id}/`;
  return (
    <PhotoLink href={address} target="_blank">
      <PhotoItemStyled src={src} alt={title} />
    </PhotoLink>
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
        }
      }
    }
  }
`;
