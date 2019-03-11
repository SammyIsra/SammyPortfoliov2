import React from "react";

import styled from "styled-components";

const FooterIconsContainer = styled.footer`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: center;
`;

const FooterIconItem = styled.div`
  margin-left: 1rem;
`;

const FooterContainer = styled.div`
  background-color: ${props => (props.dark ? "rgb(51,51,51)" : "white")};
  color: ${props => (props.dark ? "white" : "inherit")};
  padding: 1.5rem;
`;

export function Footer({ dark }) {
  return (
    <FooterContainer dark={dark}>
      Made proudly by Sammy: Finding your lack of sense of pride and
      accomplishment, disturbing.
      <FooterIconsContainer>
        <FooterIconItem>
          <a href="https://twitter.com/SammyIs_Me">Twitter</a>
        </FooterIconItem>
        <FooterIconItem>
          <a href="https://www.flickr.com/photos/sammy_iy/">Flickr</a>
        </FooterIconItem>
        <FooterIconItem>
          <a href="https://www.linkedin.com/in/sammyisrawi/">LinkedIn</a>
        </FooterIconItem>
        <FooterIconItem>
          <a href="https://dev.to/sammyisa">Dev.to</a>
        </FooterIconItem>
        <FooterIconItem>
          <a href="https://github.com/SammyIsra">Github</a>
        </FooterIconItem>
        <FooterIconItem>
          <a href="https://drive.google.com/file/d/0B1ouby1hW-sjSDdZSFYtUFB1TVE/view?usp=sharing">
            Resume
          </a>
        </FooterIconItem>
      </FooterIconsContainer>
    </FooterContainer>
  );
}
