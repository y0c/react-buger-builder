import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label : 'Salad', type : 'salad' },
    { label : 'Bacon', type : 'bacon' },
    { label : 'Cheese', type : 'cheese' },
    { label : 'Meat', type : 'meat' }
]
const buildControls = ( props ) => {
    return (
        <div className={classes.BuildControls}>
            <div> Current Price : { props.price.toFixed(2) }</div>
            {
                controls.map( ctrl => {
                   return <BuildControl
                                key={ctrl.label}
                                label={ctrl.label}
                                type={ctrl.type}
                                added={props.added}
                                removed={props.removed}
                                disabled={props.disabledInfo[ctrl.type]}
                            />;
                })
            }
            <button
                disabled={!props.purchasable}
                onClick={props.ordered}
                className={classes.OrderButton}>ORDER NOW</button>

        </div>
    )
}

export default buildControls;