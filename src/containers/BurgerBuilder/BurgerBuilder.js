import React , { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICE = {
    salad : 0.4,
    bacon : 1.2,
    cheese : 3,
    meat : 2
};

class BurgerBuilder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ingredients : {
                salad: 0,
                bacon: 0,
                cheese : 0,
                meat : 0
            },
            totalPrice : 4,
            purchasable : false,
            purchasing : false
        }
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            },0);

        this.setState({ purchasable : sum > 0 });

    }

    addIngredientHandler = ( type ) => {
        const ingredients = {
            ...this.state.ingredients,
            [type] : this.state.ingredients[type] + 1
        };

        this.setState((prevState, props) => {
            return {
                ingredients,
                totalPrice : prevState.totalPrice + INGREDIENT_PRICE[type]
            }
        });

        this.updatePurchaseState(ingredients);
    }


    removeIngredientHandler = ( type ) => {
        const ingredients = {
            ...this.state.ingredients,
            [type] : this.state.ingredients[type] - 1
        };

        if ( this.state.ingredients[type] > 0 ) {
            this.setState((prevState, props) => {
                return {
                    ingredients,
                    totalPrice : prevState.totalPrice - INGREDIENT_PRICE[type]
                }
            })
        }

        this.updatePurchaseState(ingredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing : true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing : false });
    }

    render() {
        let disabledInfo = { ...this.state.ingredients };

        for( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                    <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    added={this.addIngredientHandler}
                    removed={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                />
                <div>Build Controls</div>
            </Aux>
        )
    }
}

export default BurgerBuilder;