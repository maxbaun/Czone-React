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
		acf {
			pageClass: czone_page_classes
			pageBackground: czone_page_background
			heroTitle: czone_page_hero_title
			heroSubtitle: czone_page_hero_subtitle
			heroPosition: czone_page_hero_position
			heroCredit: czone_page_hero_credit
			landingCity: post_landing_page_city
			landingState: post_landing_page_state
		}
		image: featured_media {
			localFile {
				childImageSharp {
					hero: sizes(maxHeight: 400, maxWidth: 1600) {
						base64
						aspectRatio
						src
						srcSet
						sizes
						originalImg
					}
					full: resolutions {
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

export const Profile = graphql`
	fragment Profile on wordpress__wp_profile {
		id
		content
		title
		acf {
			title: profile_title
			video: profile_video
			facebook: profile_facebook
			instagram: profile_instagram
			testimonials: testimonial_content
		}
		image: featured_media {
			localFile {
				childImageSharp {
					thumbnail: sizes(maxWidth: 440) {
						base64
						aspectRatio
						src
						srcSet
						sizes
						originalImg
					}
					full: resolutions {
						src
						height
						width
						srcSet
					}
				}
			}
		}
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
	}
`;

export const ProfilePreview = graphql`
	fragment ProfilePreview on wordpress__wp_profile {
		title
		slug
		menuOrder: menu_order
		image: featured_media {
			localFile {
				childImageSharp {
					thumbnail: sizes(maxWidth: 135, maxHeight: 135, cropFocus: CENTER) {
						base64
						aspectRatio
						src
						srcSet
						originalImg
						sizes
					}
				}
			}
		}
	}
`;

export const MenuItems = graphql`
	fragment MenuItems on wordpress__wp_api_menus_menus_items {
		name
		items {
			title
			url
			items: wordpress_children {
				title
				url
			}
		}
	}
`;

export const Site = graphql`
	fragment Site on Site {
		id
		siteMeta: siteMetadata {
			title
			subtitle
		}
	}
`;
