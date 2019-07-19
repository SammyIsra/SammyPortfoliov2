import React from "react";
import styled from "styled-components";
import moment from "moment";
import { graphql } from "gatsby";

import { SmallHeader } from "../components/SmallHeader";

function BlogPost({ data }) {
  const post = data.markdownRemark;
  return (
    <PostContainer>
      <SmallHeader />

      {post.frontmatter.type === "work" && (
        <WorkSubHeader
          employer={post.frontmatter.employer}
          position={post.frontmatter.position}
          from={post.frontmatter.from}
          to={post.frontmatter.to}
          current={post.frontmatter.current}
          location={post.frontmatter.location}
          description={post.frontmatter.description}
        />
      )}

      {post.frontmatter.type === "media" && (
        <MediaSubHeader metadata={post.frontmatter} />
      )}

      {post.frontmatter.type === "project" && (
        <ProjectSubHeader
          title={post.frontmatter.title}
          date={post.frontmatter.date}
          link={post.frontmatter.link}
          platform={post.frontmatter.platform}
          description={post.frontmatter.description}
        />
      )}

      <PostBody dangerouslySetInnerHTML={{ __html: post.html }} />
    </PostContainer>
  );
}

/** Experience subheader for Work experiences */
function WorkSubHeader({
  employer,
  position,
  from,
  to,
  current,
  location,
  description
}) {
  const fromDate = moment(from).format("MMMM YYYY");
  const toDate = (current ? moment() : moment(to)).format("MMMM YYYY");
  return (
    <div>
      <What>{position}</What>
      <Description>{description}</Description>
      <At>{employer}</At>
      <Where> | {location}</Where>
      <From>{fromDate}</From>
      {current ? <Current /> : <To>{toDate}</To>}
    </div>
  );
}

/** Experience subheader for Media experiences */
function MediaSubHeader({ metadata }) {
  const { link, platform, title, date, description } = metadata;
  const fromDate = moment(date).format("MMMM YYYY");
  return (
    <div>
      <What>{title}</What>
      <Description>{description}</Description>
      <From>{fromDate}</From>
      <ExperienceLink link={link} platform={platform} />
    </div>
  );
}

/** Experience subheader for Project experiences */
function ProjectSubHeader({ title, date, link, platform, description }) {
  console.log("Project platform: ", platform);
  const fromDate = moment(date).format("MMMM YYYY");
  return (
    <div>
      <What>{title}</What>
      <Description>{description}</Description>
      <From>{fromDate}</From>
      <ExperienceLink link={link} platform={platform} />
    </div>
  );
}

/**
 * Shortcut to generate the external link to where a project/media is actually located
 */
function ExperienceLink({ link, platform }) {
  return link && <a href={link}>Link to {platform || "Repo"}</a>;
}

const What = styled.h2`
  line-height: 2.5rem;
  font-size: 2.5rem;
  margin-bottom: 0;
`;

const Where = styled.div`
  font-size: 1.2rem;
  display: inline;
`;

const At = styled.div`
  font-size: 1.4rem;
  display: inline;
  &:before {
    content: "@ ";
    color: rgb(204, 204, 204);
  }
`;

const From = styled.div`
  font-size: 0.9rem;
  &:before {
    content: "from: ";
    color: rgb(204, 204, 204);
  }
`;

const To = styled.div`
  font-size: 0.9rem;
  &:before {
    content: "to: ";
    color: rgb(214, 214, 214);
  }
`;

const Description = styled.div`
  color: rgb(48, 48, 48);
  font-size: 1.2rem;
`;

const Current = () => (
  <div
    style={{
      color: "rgb(204, 204, 204)",
      fontSize: "0.90rem"
    }}
  >
    (current)
  </div>
);

const PostContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  max-width: 65%;
  @media (max-width: 1000px) {
    max-width: 85%;
  }
  @media (max-width: 650px) {
    max-width: 95%;
  }
`;

const PostBody = styled.div``;

export default BlogPost;

export const query = graphql`
  query PostPageQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        date
        to
        from
        type
        location
        employer
        position
        platform
        current
        type
        link
      }
    }
  }
`;
