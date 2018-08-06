import React from 'react';

import classes from './Myorder.css';

const myorder = props => {
	const ingredients = [];
	for(let items in props.ingredients)
		ingredients.push({name : items, amount : props.ingredients[items] });
	const itemList = ingredients.map(i => {
						return  <span key={i.name} className={classes.ingredients}>{i.name} ({i.amount})</span>
					});	
	return(
			<div className={classes.order}>
				<p>Ingredients  : {itemList} </p>
				<p> Price : <strong>INR {Number.parseFloat(props.price).toFixed(2)}</strong></p>
			</div>
		  );
}

export default myorder;