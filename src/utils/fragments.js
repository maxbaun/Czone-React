import graphql from 'graphql';

export const PageFragment = graphql`
fragment Page on wordpress__PAGE {
	id
	content
	title
	date(formatString: "MMMM DD, YYYY")
	excerpt
	yoast {
		metaKeywords: focuskw
		title: title
		metaDescription: metadesc
		linkdex
		metakeywords
		noIndex: meta_robots_noindex
		noFollow: meta_robots_nofollow
		meta_robots_adv
		canonical
		redirect
		ogTitle: opengraph_title
		ogDescription: opengraph_description
		ogImage: opengraph_image
		twitterTitle: twitter_title
		twitterDescription: twitter_description
		twitterImage: twitter_image
	}
	acf{
		pageClass: czone_page_classes
		pageBackground: czone_page_background
		heroTitle: czone_page_hero_title
		heroSubtitle: czone_page_hero_subtitle,
		heroPosition: czone_page_hero_position
		heroCredit: czone_page_hero_credit
		landingCity: post_landing_page_city
		landingState: post_landing_page_state
	}
	image: featured_media {
		localFile{
			childImageSharp{
				hero: resolutions(width: 1600, height: 357, cropFocus: ENTROPY){
					src
					height
					width
					srcSet
				}
				full: resolutions{
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
	siteMeta :siteMetadata {
		title
		subtitle
	}
}
`;
