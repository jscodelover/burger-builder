import React, { Component} from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'; 
import ContactData from '../ContactData/ContactData';

class Checkout extends Component {
	// state={
	// 	ingredients: null,
	// 	totalprice : 0
	// }
	// componentWillMount(){ 
	// 	const query = new URLSearchParams(this.props.location.search);
	// 	const items = {};
	// 	let price;
	// 	for(let param of query.entries()){
	// 		if(param[0]=== 'price')
	// 			price = param[1];
	// 		else	
	// 			items[param[0]] = +param[1];
	// 	}
	// 	this.setState({ingredients : items, totalprice : price});
	// }
	checkoutsummaryCancel= () => {
		this.props.history.goBack();
	}
	checkoutsummaryContinue= () => {
		this.props.history.replace('/checkout/contact-data');
	}
	render(){
		return(
				<div>
					<CheckoutSummary ingredients = {this.props.ingredients} 
									 checkoutCancel = {this.checkoutsummaryCancel} 
									 checkoutContinue = {this.checkoutsummaryContinue} />
					{/* <Route path={this.props.match.path+'/contact-data'} 
						   render={() => <ContactData ingredients={this.state.ingredients} price={this.state.totalprice} {...this.props} />} />				 
					*/}
					<Route path={this.props.match.path+'/contact-data'} component={ContactData} />
				</div>	
			  );
	}
}

const mapStateToProps = state => {
	return {
		ingredients : state.ingredients
	}
}

export default connect(mapStateToProps)(Checkout);