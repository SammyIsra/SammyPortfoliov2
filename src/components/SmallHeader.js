import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

export function SmallHeader() {
  return (
    <HeaderContainer className="SmallHeader">
      <HeaderTitle>
        <HeaderLink to="/">[Sammy Israwi]</HeaderLink>
      </HeaderTitle>
      <HeaderSubtitleItem order="1">
        <HeaderLink to="/developer">Developer</HeaderLink>
      </HeaderSubtitleItem>
      <HeaderSubtitleItem order="3">
        <HeaderLink to="/photographer">Photographer</HeaderLink>
      </HeaderSubtitleItem>
    </HeaderContainer>
  );
}

function HeaderLink({ to, children }) {
  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        color: "inherit",
        backgroundImage: "inherit"
      }}
    >
      {children}
    </Link>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: flex-end;
`;

const HeaderTitle = styled.div`
  font-size: 2rem;
  line-height: 2rem;
  margin-top: 20px;
  order: 2;
  text-align: center;
  @media (max-width: 600px) {
    width: 100%;
    order: 0;
  }
`;

const HeaderSubtitleItem = styled.div`
  order: ${props => props.order};
`;
