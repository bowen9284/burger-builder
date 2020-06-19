import React, { useEffect } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const Orders = (props) => {
  useEffect(() => {
    props.onFetchOrders(props.token);
  }, []);

  let ordersList = <Spinner />;

  if (!props.loading) {
    ordersList = props.orders.map((order) => (
      <Order
        key={order.id}
        price={+order.price}
        ingredients={order.ingredients}
      />
    ));
  }

  return <div>{ordersList}</div>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token) => dispatch(actions.fetchOrders(token)),
  };
};

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
