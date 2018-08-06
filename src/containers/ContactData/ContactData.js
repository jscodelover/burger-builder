import React, { Component} from 'react';
import { connect } from 'react-redux';

import classes from './ContactData.css';
import Button from '../../components/UI/Button/Button';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';

class ContactData extends Component {
	state={
		orderForm : {
				name : {
					elementType : 'input',
					elementConfig : {
						type : 'text',
						placeholder : "Your Name"
					},
					value : '',
					validation : {
						required : true
					},
					valid : false,
					touched : false
				},
				street : {
					elementType : 'input',
					elementConfig : {
						type : 'text',
						placeholder : "Street No."
					},
					value : '',
					validation : {
						required : true
					},
					valid : false,
					touched : false
				},
				zipCode : {
					elementType : 'input',
					elementConfig : {
						type : 'number',
						placeholder : "Zip Code"
					},
					value : '',
					validation : {
						required : true,
						total_length : 6
					},
					valid : false,
					touched : false
				},
				country :{
					elementType : 'input',
					elementConfig : {
						type : 'text',
						placeholder : "Country"
					},
					value : '',
					validation : {
						required : true
					},
					valid : false,
					touched : false
				},
				email :{
					elementType : 'input',
					elementConfig : {
						type : 'text',
						placeholder : "Email Id"
					},
					value : '',
					validation : {
						required : true,
						isEmail : true
					},
					valid : false,
					touched : false
				},
				delivery : {
					elementType : 'select',
					elementConfig : {
						options : [{value : 'fastest', displayValue : 'Fastest'},
								  {value : 'cheapest', displayValue : 'Cheapest'}
						]
					},
					value : 'Fastest'
				}
		},
		formValid : false,
	 	loading :false
	}

	checkValidation = (value, rules) => {
		let isValid = true;
		if(rules)
		{
			isValid = value.trim() !== '' && isValid;
		    if(rules.total_length)
			    isValid = value.length === rules.total_length && isValid;
			if (rules.isEmail) {
				const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
				isValid = pattern.test(value) && isValid;
			} 
		}	
		return isValid;	
	}

	orderHandler= (event) => {
		event.preventDefault();
		const formData = {};
		for(let formElementIdentifier in this.state.orderForm)
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
		this.setState({loading : true})
		const order = {
		     ingredients : this.props.ings,
		     price : this.props.price,
		     orderData : formData
		}
		axios.post('/order.json', order)
		     .then(() => {
		     	this.setState({loading : false}); 
		     	this.props.history.push('/');
		 	 })
		     .catch(() => {this.setState({loading : false}) })
	}

	inputChangeHandler = (e, inputIdentifier) => {
		const updateOrderForm = {...this.state.orderForm};
		const updateFormElement = {...updateOrderForm[inputIdentifier]};
		updateFormElement.value = e.target.value;
		updateFormElement.touched = true;
		updateFormElement.valid =  this.checkValidation(updateFormElement.value, updateFormElement.validation);
		updateOrderForm[inputIdentifier] = updateFormElement;
		let formValidity = true;
		for(let formElementIdentifier in updateOrderForm){
			if(formElementIdentifier !== 'delivery')
			formValidity = formValidity && updateOrderForm[formElementIdentifier].valid ;
		}
		
	    this.setState({orderForm : updateOrderForm, formValid : formValidity});	
	}

	render(){
		const fromElementsArray = [];
		for(let key in this.state.orderForm)
			fromElementsArray.push({
				id : key,
				config : this.state.orderForm[key]
			})
		let form = <form onSubmit = {this.orderHandler}>
						{fromElementsArray.map(formElement => {
							return <Input key={formElement.id} 
										  ElementType = {formElement.config.elementType}
										  ElementConfig = {formElement.config.elementConfig} 
										  Value = {formElement.config.value}
										  shouldValidate = {formElement.config.validation}
										  touched = {formElement.config.touched}
										  isValid = {!formElement.config.valid}
										  changed = {(e) => this.inputChangeHandler(e,formElement.id)} />
						})}	
						<Button btnType="Success" disabled={!this.state.formValid}>ORDER</Button>
					</form>
		if(this.state.loading)
			form = <Spinner />
		return(
					<div className={classes.ContactData}>
						<h1> Enter Contact Data : </h1>
						{form}
					</div>
			  );
	}
}

const mapStateToProps = state => {
	return {
		ings : state.ingredients,
		price : state.totalPrice
	}
}

export default connect(mapStateToProps)(ContactData);