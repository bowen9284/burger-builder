import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components//UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';

class BurgerBuilder extends Component {
  state = {
    ingredients: {},
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount = () => {
    axios
      .get('/ingredients.json')
      .then(response => {
        this.props.loadIngredients(response.data);
      })
      .catch(error => {
        this.setState({ error: true });
      });
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push({
      pathname: '/checkout'    });
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={this.props.addIngredientHandler}
            ingredientRemoved={this.props.removeIngredientHandler}
            disabled={disabledInfo}
            purchaseable={this.props.purchaseable}
            ordered={this.purchaseHandler}
            price={this.props.totalPrice}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.props.totalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    purchaseable: state.purchaseable
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addIngredientHandler: ingredientType =>
      dispatch({
        type: actions.ADD_INGREDIENT,
        ingredientType: ingredientType
      }),
    removeIngredientHandler: ingredientType =>
      dispatch({
        type: actions.REMOVE_INGREDIENT,
        ingredientType: ingredientType
      }),
    loadIngredients: ingredients =>
      dispatch({
        type: actions.LOAD_INGREDIENTS,
        ingredients: ingredients
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
