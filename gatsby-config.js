const path = require("path");

module.exports = {
  siteMetadata: {
    title: "Sammy is a...",
    description:
      "☄️Sammy's website and portfolio!\nFrom Development to Photography",
    tags: ["portfolio", "software developer", "developer", "photographer"]
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: path.join(__dirname, "src", "typography.js")
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/src/posts`
      }
    },
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-plugin-remote-images",
      options: {
        nodeType: "flickrImage",
        imagePath: "url_m" // Use the 'medium' sized image for the pictures in the photostream
      }
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp"
  ]
};
