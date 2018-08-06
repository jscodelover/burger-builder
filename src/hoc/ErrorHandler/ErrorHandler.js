import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';

const errorhandler = (WrappedComponent, axios) => {
	return class extends Component{
		state={
			error : null
		}

		// INSTEAD 	OF componentDidMount we r using willMount() because it will not show error in (axios) get request
		// because componentDidMount exceute when all the child component render 
		componentWillMount(){
			this.req_interceotors = axios.interceptors.request.use(request => {
				this.setState({error : null});
				return request;
			});
			this.resp_interceptors = axios.interceptors.response.use(response => response, error => {
				this.setState({error : error});
			})
		}
		//we will use this error handle for many component
		// so this above method will be called again and again that means we will have many axios interceptors instance 
		// in our application We will have many interceptors in our application which r dead but not actually dead they 
		//will use our memory and cause error and leak memory. so we will remove the interceptors when we will unmount 
		// it.
		componentWillUnmount(){
			axios.interceptors.request.eject(this.req_interceotors);
			axios.interceptors.response.eject(this.resp_interceptors);
		}
		close=() => {
			this.setState({error :null});
		}
		render(){
			return (
				       <Aux>
				       		<Modal show={this.state.error} modalClosed={this.close}>
				       			{this.state.error ? this.state.error.message : null }
				       		</Modal>
				       		<WrappedComponent {...this.props} />
				       </Aux>
				   );
		}
	}
}

export default errorhandler;