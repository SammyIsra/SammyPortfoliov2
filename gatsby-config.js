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
        imagePath: "url_o" // Use the 'original' sized image, just in case they get shown in a 10k monitor
      }
    },
    {
      resolve: "gatsby-plugin-remote-images",
      options: {
        nodeType: "backgroundImage",
        imagePath: "url" // Use the 'original' sized image, just in case they get shown in a 10k monitor
      }
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp"
  ]
};
