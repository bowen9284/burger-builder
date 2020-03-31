import React from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

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
      <Route
        path={props.match.url + '/contact-data'}
        render={() => (
          <ContactData
            ingredients={props.ingredients}
            price={props.totalPrice}
            {...props}
          />
        )}
      ></Route>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  };
};

export default connect(mapStateToProps)(Checkout);
