import React from 'react';
import PropTypes from 'prop-types';
import graphql from 'graphql';
import {addUrlProps, UrlQueryParamTypes} from 'react-url-query';
import axios from 'axios';

import Seo from '../components/seo';
import {initPageElements} from '../utils/pageHelpers';
import {innerHtml} from '../utils/wordpressHelpers';

const urlPropsQueryConfig = {
	amount: {
		type: UrlQueryParamTypes.string,
		queryParam: `amount`
	},
	eventid: {
		type: UrlQueryParamTypes.string,
		queryParam: `eventid`
	},
	clientid: {
		type: UrlQueryParamTypes.string,
		queryParam: `clientid`
	},
	email: {
		type: UrlQueryParamTypes.string,
		queryParam: `email`
	},
	firstname: {
		type: UrlQueryParamTypes.string,
		queryParam: `firstname`
	},
	lastname: {
		type: UrlQueryParamTypes.string,
		queryParam: `lastname`
	}
};

const mapUrlToProps = (parsedParams, props) => {
	return {
		...props,
		query: {
			...parsedParams
		}
	};
};

const LOGIN = 'WSP-C-ZON-Q4sLrACeFA';
const CURRENCY_CODE = 'USD';

class PayTemplate extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			login: LOGIN,
			currencyCode: CURRENCY_CODE,
			amount: props.query.amount,
			eventid: props.query.eventid,
			amount: props.query.amount,
			clientid: props.query.clientid,
			email: props.query.email,
			firstname: props.query.firstname,
			lastname: props.query.lastname
		};

		this.renderForm = this.renderForm.bind(this);
	}

	static propTypes = {
		data: PropTypes.object.isRequired,
		query: PropTypes.object,
		location: PropTypes.object.isRequired
	}

	static defaultProps = {
		query: {}
	}

	componentDidMount() {
		initPageElements();
		this.getPayData();
	}

	getPayData() {
		const config = {
			method: 'get',
			url: `${API_URL}/czone/v1/pay`, // eslint-disable-line no-undef
			params: {
				amount: this.state.amount
			}
		};

		axios(config)
			.then(res => {
				this.setState({
					...res.data
				});
			});
	}

	getRandomInt(min, max) {
		return Math.floor((Math.random() * (max - min + 1)) + min);
	}

	render() {
		const {currentPage, site} = this.props.data;

		return (
			<div className="bg-black">
				<Seo
					currentPage={currentPage}
					location={this.props.location}
					siteMeta={site.siteMeta}
				/>
				<div className="container">
					<div
						dangerouslySetInnerHTML={innerHtml(currentPage.content)} // eslint-disable-line react/no-danger
					/>
				</div>
				<div className="content-block text-center">
					{this.renderForm()}
				</div>
			</div>
		);
	}

	renderForm() {
		if (!this.state.hash) {
			return null;
		}

		return (
			<form
				action="https://globalgatewaye4.firstdata.com/pay"
				method="POST"
				name="myForm"
				id="myForm"
			>
				<input
					name="x_login"
					value={this.state.login}
					type="hidden"
				/>
				<input
					name="x_fp_sequence"
					value={this.state.sequence}
					type="hidden"
				/>
				<input
					name="x_fp_timestamp"
					value={this.state.timestamp}
					type="hidden"
				/>
				<input
					name="x_fp_hash"
					value={this.state.hash}
					type="hidden"
				/>
				<input
					name="x_currency_code"
					value={this.state.currencyCode}
					type="hidden"
				/>
				<input
					name="x_amount"
					value={this.state.amount}
					type="hidden"
				/>
				<input
					name="x_invoice_num"
					value={this.state.eventid}
					type="hidden"
				/>
				<input
					name="x_po_num"
					value={this.state.clientid}
					type="hidden"
				/>
				<input
					name="x_first_name"
					value={this.state.firstname}
					type="hidden"
				/>
				<input
					name="x_last_name"
					value={this.state.lastname}
					type="hidden"
				/>
				<input
					name="x_email"
					value={this.state.email}
					type="hidden"
				/>

				<input
					name="enable_level3_processing"
					type="hidden"
					value="TRUE"
				/>
				<input
					type="hidden"
					name="x_show_form"
					value="PAYMENT_FORM"
				/>

				<input
					type="submit"
					name="submit"
					id="submitForm"
					className="btn btn-primary"
					value="Pay Now"
				/>
			</form>
		);
	}
}

export default addUrlProps({urlPropsQueryConfig, mapUrlToProps})(PayTemplate);

export const pageQuery = graphql`
query payQuery($id: String!) {
  currentPage: wordpressPage(id: {eq: $id}) {
	...Page
  }
  site {
	...Site
  }
}
`;
