require('dotenv').config();

console.log(process.env.NODE_TLS_REJECT_UNAUTHORIZED);

module.exports = {
  siteMetadata: {
    siteUrl: `https://www.czonemusic.com`,
    title: `C-Zone Entertainment`,
    subtitle: `Premiere DJs & Musicians | Servicing Greater Boston & New England | 617.320.0723`
  },
  plugins: [
    `gatsby-plugin-sass`,
    // https://public-api.wordpress.com/wp/v2/sites/gatsbyjsexamplewordpress.wordpress.com/pages/
    /*
     * Gatsby's data processing layer begins with “source”
     * plugins. Here the site sources its data from Wordpress.
     */
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        /*
         * The base URL of the Wordpress site without the trailingslash and the protocol. This is required.
         * Example : 'gatsbyjswpexample.wordpress.com' or 'www.example-site.com'
         */
        baseUrl: `admin.czonemusic.com`,
        // The protocol. This can be http or https.
        protocol: `https`,
        // Indicates whether the site is hosted on wordpress.com.
        // If false, then the asumption is made that the site is self hosted.
        // If true, then the plugin will source its content on wordpress.com using the JSON REST API V2.
        // If your site is hosted on wordpress.org, then set this to false.
        hostingWPCOM: false,
        // If useACF is true, then the source plugin will try to import the Wordpress ACF Plugin contents.
        // This feature is untested for sites hosted on Wordpress.com
        useACF: true,
        verboseOutput: true
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-4072057-1`
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`
    }
  ]
};
