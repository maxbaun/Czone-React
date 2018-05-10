const webpack = require('webpack');
const slash = require('slash');
const Promise = require('bluebird');
const path = require('path');

exports.modifyWebpackConfig = ({config}) => {
	const isDev = process.env.NODE_ENV === 'development';
	config.merge({
		plugins: [
			new webpack.DefinePlugin({
				API_URL: JSON.stringify(isDev ? 'http://czone.info/wp-json' : 'http://czonemusic.com/wp-json')
			})
		]
	});

	return config;
};

exports.createPages = ({graphql, boundActionCreators}) => {
	const {createPage} = boundActionCreators;
	return Promise.all([
		getPages(graphql, createPage),
		getProfiles(graphql, createPage)
	]);
};

function getPages(graphql, createPage) {
	return new Promise((resolve, reject) => {
		graphql(
			`
			{
				pages: allWordpressPage {
					edges {
						node {
							id
							wpid: wordpress_id
							slug
							status
							template
							parent: wordpress_parent
							acf {
								landingPageBase: landing_page_base
							}
						}
					}
				}
			}
			`
		).then(result => {
			if (result.errors) {
				console.log(result.errors);
				reject(result.errors);
			}

			result.data.pages.edges.forEach(edge => {
				if (edge.node.slug === 'home') {
					return;
				}

				createPage({
					path: getSlug(edge, result.data.pages.edges),
					component: slash(getPageTemplate(edge.node.template)),
					context: {
						id: edge.node.id,
						landingPageBase: parseInt(edge.node.acf.landingPageBase, 10)
					}
				});
			});

			resolve();
		});
	});
}

function getProfiles(graphql, createPage) {
	return new Promise((resolve, reject) => {
		graphql(
			`
			{
				profiles: allWordpressWpProfile {
					edges {
						node {
							id
							wpid: wordpress_id
							slug
							status
						}
					}
				}
			}
			`
		).then(result => {
			if (result.errors) {
				console.log(result.errors);
				reject(result.errors);
			}

			result.data.profiles.edges.forEach(edge => {
				createPage({
					path: `/profile/${edge.node.slug}`,
					component: slash(path.resolve(`./src/templates/profile.js`)),
					context: {
						id: edge.node.id
					}
				});
			});

			resolve();
		});
	});
}

function getSlug(edge, edges) {
	if (!edge.node.parent) {
		return `/${edge.node.slug}`;
	}

	const parent = edges.find(e => e.node.wpid === edge.node.parent);

	return getSlug(parent, edges) + `/${edge.node.slug}`;
}

function getPageTemplate(template) {
	if (template === 'template-full-width.php') {
		return path.resolve(`./src/templates/fullWidth.js`);
	}

	if (template === 'template-profiles.php') {
		return path.resolve(`./src/templates/profiles.js`);
	}

	if (template === 'template-pay.php') {
		return path.resolve(`./src/templates/pay.js`);
	}

	return path.resolve(`./src/templates/page.js`);
}
