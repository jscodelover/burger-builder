import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import MyOrders from './containers/MyOrders/MyOrders';

class App extends Component {
  render () {
    return (
    	  <Layout>
    	  	<Switch>
    	    	<Route path="/checkout" component={Checkout} /> 
    	    	<Route path="/myorders" component={MyOrders} />
    	    	<Route exact path="/" component={BurgerBuilder} />
    	    </Switch>	
    	  </Layout>
    );
  }
}

export default App;
