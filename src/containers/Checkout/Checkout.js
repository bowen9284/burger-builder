import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

const Checkout = props => {
  const checkoutCancelledHandler = () => {
      props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
      props.history.replace('/checkout/contact-data');
  };

  return (
    <div>
      <CheckoutSummary
        ingredients={props.ingredients}
        checkoutCancelled={checkoutCancelledHandler}
        checkoutContinued={checkoutContinuedHandler}
      />
    </div>
  );
};

export default Checkout;
