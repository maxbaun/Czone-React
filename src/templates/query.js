import graphql from 'graphql';

export const Page = graphql`
fragment Page on wordpress__PAGE {
  id,
  content,
  title,
  date(formatString: "MMMM DD, YYYY")
  yoast_meta {
	  title: yoast_wpseo_title
	  description: yoast_wpseo_metadesc
	  keywords: yoast_wpseo_focuskw
  }
  acf{
	  pageClass: czone_page_classes
      pageBackground: czone_page_background
      heroTitle: czone_page_hero_title
      heroSubtitle: czone_page_hero_subtitle,
      heroPosition: czone_page_hero_position
      heroCredit: czone_page_hero_credit
  }
  image: featured_media {
	  localFile{
		childImageSharp{
		  resolutions(width: 1600, height: 357){
			src
			height
			width
			srcSet
		  }
		}
	  }
  }
}
`;

export const Site = graphql`
fragment Site on Site {
  id
  siteMetadata {
	title
	subtitle
  }
}
`;
