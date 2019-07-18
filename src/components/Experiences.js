import React from "react";
import styled from "styled-components";
import { graphql, StaticQuery, Link } from "gatsby";

import { Green, Red, Bold } from "./Styles";

export class Experiences extends React.Component {
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
    //Get whether we filter out private posts, and if we want to be verbose about the post
    const { filterPrivate, verbose } = this.props;

    const experiencesQuery = graphql`
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

    return (
      <StaticQuery
        query={experiencesQuery}
        render={data => (
          <ExperiencesContainer>
            <ExperiencesTitle>Experiences:</ExperiencesTitle>
            <PostsFilter
              allFilters={this.state.allFilters}
              activeFilters={this.state.activeFilters}
              setFilters={this.setFilters}
            />
            <hr />
            {data.allMarkdownRemark.edges
              // Get jsut to get the nodes from the edges
              .map(edge => edge.node)
              // Filter out unpublished ones IF we ahve been told to do so
              .filter(post => !filterPrivate || post.frontmatter.published)
              // Filter out based on selected types
              .filter(post =>
                this.state.activeFilters.includes(post.frontmatter.type)
              )
              // Render the posts
              .map(post => (
                <DeveloperPost
                  verbose={verbose}
                  key={post.fields.slug}
                  title={post.frontmatter.title}
                  description={post.frontmatter.description}
                  timeToRead={post.timeToRead}
                  type={post.frontmatter.type}
                  location={post.fields.slug}
                  published={post.frontmatter.published}
                />
              ))}
          </ExperiencesContainer>
        )}
      />
    );
  }
}

function DeveloperPost({
  title,
  description,
  type,
  location,
  verbose,
  published
}) {
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
        {verbose &&
          (published ? (
            <Green>
              <Bold>PUBLISHED</Bold>
            </Green>
          ) : (
            <Red>
              <Bold>UNPUBLISHED</Bold>
            </Red>
          ))}
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
