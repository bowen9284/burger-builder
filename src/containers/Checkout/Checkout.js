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
        component={ContactData}
      ></Route>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
  };
};

export default connect(mapStateToProps)(Checkout);
