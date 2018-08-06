import React, { Component} from 'react';

import MyOrder from '../../components/Order/Myorder';
import axios from '../../axios-order';
import errorHandler from '../../hoc/ErrorHandler/ErrorHandler';

class MyOrders extends Component {
	state={
		Orders : [],
		loading : true
	}
	componentDidMount(){
		axios.get('/order.json')
			 .then(res => {
			 	const fetchOrder = [];
			 	for(let key in res.data)
			 		fetchOrder.push({...res.data[key],id : key});
			 	console.log(fetchOrder)
			 	this.setState({loading : false, Orders : fetchOrder});
			})
			 .catch(err => {
			 	this.setState({loading : false});
			})
	}
	render(){
		return(
				<div>
					{
						this.state.Orders.map(order => <MyOrder key={order.id} price={order.price} ingredients={order.ingredients} />)
					}
				</div>	
			  );
	}
}

export default errorHandler(MyOrders,axios);