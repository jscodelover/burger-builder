import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorhandler from '../../hoc/ErrorHandler/ErrorHandler';
import * as actionType from '../../store/action';


class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        purchasing: false,
        loading : false,
        error : false
    }

    componentDidMount(){
        // axios.get('/ingredients.json')
        //      .then(response => {
        //         this.setState({ingredients : response.data});
        //      })
        //      .catch(error => {
        //             this.setState({error : true});
        //      })

    }

    updatePurchaseState(ingredients){
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );   
        return sum > 0 ;
    }

    // addIngredientHandler = ( type ) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = ( type ) => {
    //     const oldCount = this.state.ingredients[type];
    //     if ( oldCount <= 0 ) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    // purchaseContinueHandler = () => {
    //     const queryParams = [];
    //     for(let i in this.state.ingredients)
    //         queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
    //     queryParams.push("price="+this.props.totalCost);
    //     const queryString = queryParams.join('&');
    //     this.props.history.push({
    //         pathname : '/checkout',
    //         search : '?' + queryString
    //     });
    // }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render () {
        const disabledInfo = { ...this.props.ings };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // {salad: true, meat: false, ...}
        let orderSummary;
        let burger = <Spinner />
        if(this.props.ings)
        {
            burger = <Aux>
                        <Burger ingredients={this.props.ings} />
                        <BuildControls  
                            ingredientAdded={this.props.addIngredientHandler}
                            ingredientRemoved={this.props.removeIngredientHandler}
                            disabled={disabledInfo}
                            purchasable={this.updatePurchaseState(this.props.ings)}
                            ordered={this.purchaseHandler}
                            price={this.props.totalCost} />
                    </Aux>
            orderSummary = <OrderSummary 
                                ingredients={this.props.ings}
                                price={this.props.totalCost}
                                purchaseCancelled={this.purchaseCancelHandler}
                                purchaseContinued={this.purchaseContinueHandler} />         
        } 
        if(this.state.loading)
            orderSummary = <Spinner /> 
                       
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {this.state.error ? 
                    <p><strong>Ingredients couldn't be download from server!! Check Your Internet Connection</strong></p>
                     : 
                    burger }
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return{
        ings : state.ingredients,
        totalCost : state.totalPrice
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        addIngredientHandler : item_type => dispatch({type : actionType.ADD_INGREDIENT, 
                                                      ingredientName : item_type}),
        removeIngredientHandler : item_type => dispatch({type : actionType.REMOVE_INGREDIENT,
                                                         ingredientName : item_type})
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(errorhandler(BurgerBuilder,axios));