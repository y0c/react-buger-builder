import React, { Component } from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.checkoutSummary}>
            <h1>We Hope it tastes well!</h1>
            <div style={{ width: '100%', margin: 'auto'}}>
                <Burger ingredients={ props.ingredients }/>
            </div>
            <Button
                btnType="Danger"
            >CANCEL</Button>
            <Button
                btnType="Success"
            >CONTINUE</Button>
        </div>
    )
}

export default checkoutSummary;