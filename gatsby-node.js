const webpack = require('webpack');
const slash = require('slash');
const Promise = require('bluebird');
const path = require('path');

exports.createPages = ({graphql, boundActionCreators}) => {
	const {createPage} = boundActionCreators;
	return new Promise((resolve, reject) => {
		// The “graphql” function allows us to run arbitrary
		// queries against the local Wordpress graphql schema. Think of
		// it like the site has a built-in database constructed
		// from the fetched data that you can run queries against.

		// ==== PAGES (WORDPRESS NATIVE) ====
		graphql(
			`
			{
				allWordpressPage {
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

			// Create Page pages.
			// We want to create a detailed page for each
			// page node. We'll just use the Wordpress Slug for the slug.
			// The Page ID is prefixed with 'PAGE_'
			result.data.allWordpressPage.edges.forEach(edge => {
				// Gatsby uses Redux to manage its internal state.
				// Plugins and sites can use functions like "createPage"
				// to interact with Gatsby.
				createPage({
					// Each page is required to have a `path` as well
					// as a template component. The `context` is
					// optional but is often necessary so the template
					// can query data specific to each page.
					path: getSlug(edge, result.data.allWordpressPage.edges), // `/${edge.node.slug}`
					component: getPageTemplate(edge.node.template),
					context: {
						id: edge.node.id,
						landingPageBase: parseInt(edge.node.acf.landingPageBase, 10) // getLandingBase(edge.node, result.data.allWordpressPage.edges)
					}
				});
			});
			resolve();
		});
	});
};

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

	return path.resolve(`./src/templates/page.js`);
}

function getLandingBase(page, pages) {
	if (!page.acf || !page.acf.landingPageBase) {
		return;
	}

	const parent = pages.find(p => {
		console.log('===========');
		console.log(p.node.wpid, typeof p.node.wpid);
		console.log(parseInt(page.acf.landingPageBase, 10), typeof parseInt(page.acf.landingPageBase, 10));
		console.log('===========');

		return p.node.wpid === parseInt(page.acf.landingPageBase, 10);
	});

	console.log(parseInt(page.acf.landingPageBase, 10));
	console.log(parent);

	if (!parent) {
		return;
	}

	return parent.node.id;
}
