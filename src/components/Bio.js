import styled from "styled-components";

export const Bio = styled.div`
  width: 85%;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  @media screen and (min-width: 525px) {
    width: 75%;
  }
`;

export const BioTitle = styled.h2`
  font-size: 3rem;
  line-height: 3rem;
  margin-top: 0;
`;

export const BioBody = styled.p`
  font-size: 1.75rem;
  line-height: 1.75rem;
`;
