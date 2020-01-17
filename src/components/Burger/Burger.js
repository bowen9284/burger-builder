import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from '../../components/Burger/BurgerIngredient/BurgerIngredient';

const burger = props => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(key => {
      return [...Array(props.ingredients[key])].map((_, i) => {
        return <BurgerIngredient key={key + i} ingredient={key} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

if (transformedIngredients.length === 0) {
  transformedIngredients = "Please start adding ingredients!"
}
  return (
    <div className={classes.Burger}>
      <BurgerIngredient ingredient="bread-top" />
      {transformedIngredients}
      <BurgerIngredient ingredient="bread-bottom" />
    </div>
  );
};

export default burger;
