import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from '../../components/Burger/BurgerIngredient/BurgerIngredient';

const burger = props => {
  return (
    <div className={classes.Burger}>
      <BurgerIngredient ingredient="bread-top" />
      <BurgerIngredient ingredient="cheese" />
      <BurgerIngredient ingredient="meat" />
      <BurgerIngredient ingredient="bread-bottom" />
    </div>
  );
};

export default burger;
