import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

//Aditional rules I can't fix w styled components ☹️
import "./Header.css";

const HeaderContainer = styled.header`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: cover;
  ${props =>
    props.image ? "background-image: url('" + props.image.large + "');" : null}
`;
// background-image: ${props => `url("${props.image})` || "none"};

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
  const bgImages = {
    photographer: [
      {
        large:
          "https://c1.staticflickr.com/5/4164/33673946114_a8021829e8_h.jpg",
        medium:
          "https://c1.staticflickr.com/5/4164/33673946114_3aedbaedf2_b.jpg",
        small: "https://c1.staticflickr.com/5/4164/33673946114_3aedbaedf2_c.jpg"
      },
      {
        large:
          "https://c2.staticflickr.com/6/5622/30348760064_f21efb6115_h.jpg",
        medium:
          "https://c2.staticflickr.com/6/5622/30348760064_275a99d1c9_b.jpg",
        small: "https://c2.staticflickr.com/6/5622/30348760064_275a99d1c9_c.jpg"
      },
      {
        large:
          "https://c2.staticflickr.com/8/7301/27003100350_47e097bd83_h.jpg",
        medium:
          "https://c2.staticflickr.com/8/7301/27003100350_1c36f9bb9e_b.jpg",
        small: "https://c2.staticflickr.com/8/7301/27003100350_1c36f9bb9e_c.jpg"
      }
    ],
    developer: [],
    home: []
  };

  /** Link of image used in background. is `undefined` if page has no image */
  const imgLink =
    bgImages[page][Math.floor(Math.random() * bgImages[page].length)];

  return (
    <HeaderContainer image={imgLink} className="Header">
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
