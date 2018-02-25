import React from "react";
import classes from "./Order.css";
const order = props => {
    const ingredients = [];

    for (let ingredientsName in props.ingredients) {
        ingredients.push({
            name: ingredientsName,
            amount: props.ingredients[ingredientsName]
        });
    }

    const ingredientOutput = ingredients.map(ig => {
        return (
            <span
                key={ig.id}
                style={{
                    textTransform: "capitalize",
                    margin: "0 8px",
                    border: "1px solid #ccc",
                    padding: "2px"
                }}
            >
                {ig.name} ({ig.amount})
            </span>
        );
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients : {ingredientOutput}</p>
            <p>
                Price :{" "}
                <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
            </p>
        </div>
    );
};
export default order;
