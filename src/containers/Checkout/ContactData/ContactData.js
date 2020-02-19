import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

const ContactData = props => {
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    address: {
      street: '',
      zipCode: ''
    }
  });

  const [loading, setLoading] = useState(false);

  const orderHandler = event => {
    event.preventDefault();
    setLoading(true);
    const order = {
      ingredients: props.ingredients,
      price: props.price,
      customer: {
        name: 'M Bowe',
        address: {
          street: 'Street A',
          zipCode: '90210',
          country: 'USA'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'dine-in'
    };

    axios
      .post('/orders.json', order)
      .then(response => {
        setLoading(false);
        props.history.push('/');
      })
      .catch(error => {
        setLoading(false);
      });
  };

  let form = (
    <form>
      <input
        className={classes.Input}
        type="email"
        name="email"
        placeholder="Your Email"
      />
      <input
        className={classes.Input}
        type="text"
        name="name"
        placeholder="Your Name"
      />
      <input
        className={classes.Input}
        type="text"
        name="street"
        placeholder="Your Street"
      />
      <input
        className={classes.Input}
        type="text"
        name="zipCode"
        placeholder="Your Zip Code"
      />
      <Button btnType="Success" clicked={orderHandler}>
        Submit
      </Button>
    </form>
  );

  if (loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      {form}
    </div>
  );
};

export default ContactData;
