import React, { useEffect, useState } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const Orders = props => {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    axios
      .get('/orders.json')
      .then(response => {
        const orders = [];
        for (let key in response.data) {
          orders.push({
            ...response.data[key],
            id: key
          });
        }
        setOrders(orders);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  let ordersList = <Spinner />;

  if (orders) {
    console.log(orders);
    ordersList = orders.map((order, index) => (
      <Order
        key={order.id}
        price={+order.price}
        ingredients={order.ingredients}
      />
    ));
  }

  return <div>{ordersList}</div>;
};

export default withErrorHandler(Orders, axios);
