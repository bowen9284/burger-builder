import React, { Fragment, Component } from 'react';
import Button from '../../UI/Button/Button';
import Checkout from '../../../containers/Checkout/Checkout';

class OrderSummary extends Component {
  // doesn't have to be a class
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(key => {
      return (
        <li key={key}>
          <span style={{ textTransform: 'capitalize' }}>{key}</span>:
          {this.props.ingredients[key]}
        </li>
      );
    });

    return (
      <Fragment>
        <h3>Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Checkout ingredients={this.props.ingredients}/>
      </Fragment>
    );
  }
}

export default OrderSummary;
