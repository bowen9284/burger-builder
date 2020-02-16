import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Thank you</h1>
      <Button btnType="Danger" clicked={props.checkoutCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.checkoutContinued}>
        CONTINUE
      </Button>
      <div style={{ margin: 'auto', width: '100%' }}>
        {/* <Burger ingredients={props.ingredients} /> */}
      </div>
    </div>
  );
};

export default checkoutSummary;
