import React, { useEffect, useState } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = props => {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    axios
      .get('/orders.json')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  let ordersList = <Spinner />;

  if (orders) {
    console.log(Object.values(orders));
    ordersList = Object.values(orders).map((order, index) => (
      <Order key={index} price={order.price} />
    ));
  }

  return <div>{ordersList}</div>;
};

export default Orders;
