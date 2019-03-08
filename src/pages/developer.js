import React from "react";
import { Link, graphql } from "gatsby";
import styled from "styled-components";

import { Layout } from "../components/Layout";

const DeveloperPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges
    .map(edge => edge.node)
    .filter(post => post.frontmatter.published);

  return (
    <Layout theme="dark" page="developer">
      <DeveloperBio />
      <Experiences posts={posts} />
    </Layout>
  );
};

function DeveloperBio() {
  const title = "Sammy is a... Developer";
  const bio =
    "A software developer mainly focused on Web development. " +
    "Open web and education advocate, I believe in the web as one of the biggest " +
    "gatekeeper beaters out there. Some of my favorite toys are " +
    "JavaScript (and TypeScript), C#, Meteor, React, Redux, Angular, Git, .Net and RxJS. " +
    "Other than those, have experience playing with " +
    "C, Java, Python and Ruby. I am also exploring web animations " +
    "w/ SVGs, functional and reactive programming paradigms, and Machine Learning!";

  return (
    <Bio>
      <BioTitle>{title}</BioTitle>
      <BioBody>
        {bio}
        <br />I also write sometimes in{" "}
        <a href="https://dev.to/sammyisa">Dev.to</a> and ramble on{" "}
        <a href="https://twitter.com/SammyIs_Me">Twitter under @SammyIs_Me</a>.
        Also, you can find what I am doing in my{" "}
        <a href="https://github.com/SammyIsra">GitHub</a>.
      </BioBody>
    </Bio>
  );
}

class Experiences extends React.Component {
  //All filters are active to start with because
  // we display all posts of type == something on the filters
  state = {
    allFilters: ["work", "project", "media"],
    activeFilters: ["work", "project", "media"]
  };

  setFilters = newFilters => {
    this.setState({
      activeFilters: newFilters
    });
  };

  render() {
    //Get the posts from the query
    const { posts } = this.props;

    //We create the filtered posts here because it would be easier than
    // having them as state
    const filteredPosts = posts.filter(post =>
      this.state.activeFilters.includes(post.frontmatter.type)
    );

    return (
      <ExperiencesContainer>
        <ExperiencesTitle>Experiences:</ExperiencesTitle>
        <PostsFilter
          allFilters={this.state.allFilters}
          activeFilters={this.state.activeFilters}
          setFilters={this.setFilters}
        />
        <hr />
        {filteredPosts.map(post => (
          <DeveloperPost
            key={post.fields.slug}
            title={post.frontmatter.title}
            description={post.frontmatter.description}
            timeToRead={post.timeToRead}
            type={post.frontmatter.type}
            location={post.fields.slug}
          />
        ))}
      </ExperiencesContainer>
    );
  }
}

function DeveloperPost({ title, description, type, location }) {
  return (
    <Link
      to={location}
      style={{
        textDecoration: "none",
        color: "inherit",
        backgroundImage: "inherit",
        marginBottom: "1.5rem"
      }}
    >
      <PostContainer>
        <PostTitle>{title}</PostTitle>&nbsp;
        <PostType>{type}</PostType>
        <PostDescription>{description}</PostDescription>
      </PostContainer>
    </Link>
  );
}

class PostsFilter extends React.Component {
  //From the list of active filters, we need to
  // figure out if we add or remove an item from the list.
  // I first wanted to keep an object of all the filter where
  // [filterName]: active (true) OR not active (false)
  // but it was challenging and annoying having that around along with
  // the array of active filters that came from as props.
  toggleSingleFilter = filter => {
    if (this.props.activeFilters.includes(filter))
      return this.props.activeFilters.filter(fil => fil !== filter);
    else return [...this.props.activeFilters, filter];
  };

  render() {
    const { allFilters, activeFilters, setFilters } = this.props;

    return (
      <FilterWrapper>
        {allFilters.map(filter => (
          <FilterItem
            key={filter}
            active={activeFilters.includes(filter)}
            onClick={() => setFilters(this.toggleSingleFilter(filter))}
          >
            {filter}
          </FilterItem>
        ))}
      </FilterWrapper>
    );
  }
}

const Bio = styled.div`
  width: 75%;
  margin-left: auto;
  margin-right: auto;
`;

const BioTitle = styled.h2`
  font-size: 3rem;
  line-height: 3rem;
`;

const BioBody = styled.p`
  font-size: 1.4rem;
  line-height: 1.75rem;
`;

const PostContainer = styled.div`
  border-left: 0.2rem solid rgba(204, 204, 204, 0);
  padding-left: 0.3rem;
  &:hover {
    border-left: 0.2rem solid rgba(204, 204, 204, 1);
  }
`;

const PostTitle = styled.h3`
  display: inline;
  line-height: 1.8rem;
  font-size: 1.8rem;
`;

const PostDescription = styled.p`
  margin-bottom: 0;
`;

const PostType = styled.span`
  color: rgb(115, 115, 115);
  line-height: 1.75rem;
  font-size: 1.75rem;
  margin-bottom: 0;
  &:before {
    content: "#";
    color: rgb(204, 204, 204);
    font-weight: 300;
  }
`;

const ExperiencesContainer = styled.div`
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

const ExperiencesTitle = styled.h2`
  font-size: 1.95rem;
  line-height: 1.95rem;
  margin-bottom: 1.3rem;
`;

const FilterItem = styled.div`
  font-size: 1.25rem;
  color: rgb(115, 115, 115);
  opacity: ${({ active }) => (active ? "1" : "0.5")};
  cursor: pointer;
  &:before {
    content: "#";
    color: rgb(204, 204, 204);
    font-weight: 300;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
`;

export default DeveloperPage;

export const query = graphql`
  query PostsData {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          frontmatter {
            title
            date
            description
            type
            published
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
