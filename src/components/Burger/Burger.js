import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = ( props ) => {

    //object -> array  변환 후 변환댄  array를 flat 하게 연결해줌
    let transfromedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [ ...Array(props.ingredients[igKey]) ].map((_, i ) => {
                return <BurgerIngredient key={igKey + i } type={igKey} />;
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, [])


        if( transfromedIngredients.length === 0 ){
            transfromedIngredients = <p>Pleasea start adding ingredients!</p>
        }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transfromedIngredients}
            <BurgerIngredient type="bread-bottom" />

        </div>
    )
}

export default burger;