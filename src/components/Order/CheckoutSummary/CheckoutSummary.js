import React from 'react';

import classes from './CheckoutSummary.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutsummary = props =>{
	return(
			<div className={classes.checkout}>
				<h1>We hope it taste well !</h1>
				<div style={{margin : 'auto', width : '100%'}}>
					<Burger ingredients={props.ingredients}/>
				</div>
				<Button btnType="Danger" clicked={props.checkoutCancel}>CANCEL</Button>
				<Button btnType="Success" clicked={props.checkoutContinue}>CONTINUE</Button>
			</div>
		  );
}

export default checkoutsummary;