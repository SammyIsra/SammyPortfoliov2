const { createFilePath } = require("gatsby-source-filesystem");
const path = require("path");
const fetch = require("node-fetch");

const urlAllPhotos =
  "https://us-central1-photo-flick-d764c.cloudfunctions.net/getFlickPhotos?sortBy=date";

/**
 * Fetch data from my personal Flickr endpoint to get the pictures
 */
exports.sourceNodes = function({ actions, createContentDigest }) {
  const { createNode } = actions;

  return new Promise((resolve, reject) => {
    //All photos
    fetch(urlAllPhotos)
      .then(resp => resp.json())
      .then(photos => {
        photos.forEach(element => {
          createNode(processFlickrImageList(element, createContentDigest));
        });
        resolve();
      })
      .catch(reject);
  });

  function processFlickrImageList(flickrItem, digest) {
    // console.log("Flickr:", flickrItem);
    return {
      ...flickrItem,
      address: `https://www.flickr.com/photos/${flickrItem.owner}/${
        flickrItem.id
      }/`,
      children: [],
      parent: null,
      internal: {
        type: "flickrImage",
        content: JSON.stringify(flickrItem),
        contentDigest: digest(flickrItem)
      }
    };
  }
};

exports.onCreateNode = function({ node, getNode, actions }) {
  const { createNodeField } = actions;
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode, basePath: "pages" });
    createNodeField({
      node,
      name: "slug",
      value: `/posts${slug}`
    });
  }
};

exports.createPages = function({ graphql, actions }) {
  return new Promise((resolve, reject) => {
    const { createPage } = actions;

    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `)
      .then(result => {
        result.data.allMarkdownRemark.edges.forEach(({ node }) =>
          createPage({
            path: node.fields.slug,
            component: path.resolve("./src/templates/blog-post.js"),
            context: {
              slug: node.fields.slug
            }
          })
        );
        resolve();
      })
      .catch(error => {
        console.error("Error on createPages", error);
        reject(error);
      });
  });
};
