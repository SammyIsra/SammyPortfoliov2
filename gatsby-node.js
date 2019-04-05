const { createFilePath } = require("gatsby-source-filesystem");
const path = require("path");
const fetch = require("node-fetch");

const urlAllPhotos =
  "https://us-central1-photo-flick-d764c.cloudfunctions.net/getFlickPhotos?sortBy=date";

const backgroundImages = [
  {
    id: "35603497704",
    title: "Closeup of Cactus in Chinatown",
    url: "https://farm5.staticflickr.com/4403/35603497704_d3780050fd_o.jpg",
    for: "photographer"
  },
  {
    id: "33673946114",
    title: "Fabric on the ceiling of Renwick Gallery",
    url: "https://farm5.staticflickr.com/4164/33673946114_501a33a408_o.jpg",
    for: "photographer"
  },
  {
    id: "27002976320",
    title: "Long Exposure on River",
    url: "https://farm8.staticflickr.com/7348/27002976320_ed6bf78e97_o.jpg",
    for: "photographer"
  },
  {
    id: "20806009693",
    title: "Detail of Mom's Work",
    url: "https://farm1.staticflickr.com/671/20806009693_ee94a66760_o.jpg",
    for: "photographer"
  },
  {
    id: "RedAndBlackFrom_trianglify",
    title: "Red and Black background from Trianglify",
    url: "https://i.imgur.com/YOTcmry.png",
    for: "developer"
  },
  {
    id: "EtherealRainbow_trianglify",
    title: "Ethereal Rainbow from Trianglify",
    url: "https://i.imgur.com/2lHcvrN.png",
    for: "developer"
  },
  {
    id: "OrlandoMagic_trianglify",
    title: "Orlando Magic-ish from Trianglify",
    url: "https://i.imgur.com/XNhcUO4.png",
    for: "developer"
  }
];

/**
 * Fetch data from my personal Flickr endpoint to get the pictures
 */
exports.sourceNodes = function({ actions, createContentDigest }) {
  const { createNode } = actions;

  //All photos
  return Promise.all([
    // Flickr images (async)
    fetch(urlAllPhotos)
      .then(resp => resp.json())
      .then(photos => {
        photos.forEach(element => {
          createNode(processFlickrImageList(element, createContentDigest));
        });
      }),

    // Background images (not really async)
    backgroundImages.forEach(function processBackgroundImage(img) {
      createNode({
        ...img,
        children: [],
        parent: null,
        internal: {
          type: "backgroundImage",
          content: JSON.stringify(img),
          contentDigest: createContentDigest(img)
        }
      });
    })
  ]);

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
