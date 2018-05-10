import React, {Fragment} from 'react';

const NotFound = () => {
	return (
		<Fragment>
			<div className="page-header">
				<h1 className="text-center"><span className="">Not Found</span></h1>
			</div>
			<section className="text-center">
				<div className="content-block  text-center">
					<br/>
					<h1>Sorry, but the page you were trying to view does not exist.</h1>
					<br/>
				</div>
			</section>
		</Fragment>
	);
};

export default NotFound;

