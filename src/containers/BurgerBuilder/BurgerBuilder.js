import React , { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
            totalPrice : 4
        }
    }

    addIngredientHandler = ( type ) => {
        this.setState((prevState, props) => {
            return {
                ingredients : {
                    ...this.state.ingredients,
                    [type] : prevState.ingredients[type] + 1
                },
                totalPrice : prevState.totalPrice + INGREDIENT_PRICE[type]
            }
        });
    }

    removeIngredientHandler = ( type ) => {
        if ( this.state.ingredients[type] > 0 ) {
            this.setState((prevState, props) => {
                return {
                    ingredients : {
                        ...this.state.ingredients,
                        [type] : prevState.ingredients[type] - 1
                    },
                    totalPrice : prevState.totalPrice - INGREDIENT_PRICE[type]
                }
            })
        }
    }

    render() {
        let disabledInfo = { ...this.state.ingredients };

        for( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return(
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    added={this.addIngredientHandler}
                    removed={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                />
                <div>Build Controls</div>
            </Aux>
        )
    }
}

export default BurgerBuilder;