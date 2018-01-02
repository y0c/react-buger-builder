import React , { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
            ingredients :null,
            totalPrice : 4,
            loading    : false,
            purchasable : false,
            purchasing : false,
            error : null
        }
    }

    componentDidMount () {
        axios.get('/ingredients.json', {} )
            .then( response => {
                this.setState({ ingredients : response.data } );
            })
            .catch( error => {
                this.setState({ error : null});
            });
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

    purchaseContinueHandler = () => {
        const order = {
            ingredients : this.state.ingredients,
            customer : {
                name : 'Lim Ho Sung',
                address : {
                    street : 'test street',
                    zipCode : '41332',
                    country : 'South Korea'
                }
            },
            deliveryMethod : 'fastest'
        };

        this.setState({ loading : true });

        axios.post('/orders.json', order )
            .then( response => {
                this.setState({ loading : false, purchasing : false });
            })
            .catch( error => {
                this.setState({ loading : false, purchasing : false });
            });
    }

    render() {
        let disabledInfo = { ...this.state.ingredients };

        for( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let burger = (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    added={this.addIngredientHandler}
                    removed={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        );

        let orderSummary = <OrderSummary
                            ingredients={this.state.ingredients}
                            purchaseCanceled={this.purchaseCancelHandler}
                            purchaseContinued={this.purchaseContinueHandler}
                            price={this.state.totalPrice}
                        />;

        if ( !this.state.ingredients ) {
           burger = <Spinner />
           orderSummary = null;
        }

        if ( this.state.loading ) {
            orderSummary = <Spinner />
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
                <div>Build Controls</div>
                {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);