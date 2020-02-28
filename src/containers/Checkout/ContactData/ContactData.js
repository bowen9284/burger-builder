import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

const ContactData = props => {
  const [contactInfo, setContactInfo] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Name'
      },
      value: ''
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Street'
      },
      value: ''
    },
    zipCode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Zip'
      },
      value: ''
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Country'
      },
      value: ''
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email'
      },
      value: ''
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: 'fastest', displayValue: 'Fastest' },
          { value: 'cheapest', displayValue: 'Cheapest' }
        ]
      },
      value: ''
    }
  });

  const [loading, setLoading] = useState(false);

  const orderHandler = event => {
    event.preventDefault();
    setLoading(true);
    const orderData = {};
    for (let field in contactInfo) {
      orderData[field] = contactInfo[field];
    }
    const orderForm = {
      ingredients: props.ingredients,
      price: props.price,
      orderData: orderData
    };

    axios
      .post('/orders.json', orderForm)
      .then(response => {
        setLoading(false);
        props.history.push('/');
      })
      .catch(error => {
        setLoading(false);
      });
  };

  const formElementsArray = [];
  for (const key in contactInfo) {
    formElementsArray.push({
      id: key,
      config: contactInfo[key]
    });
  }

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedForm = {
      ...contactInfo
    };

    updatedForm[inputIdentifier].value = event.target.value;

    setContactInfo(updatedForm);
  };

  let form = (
    <form onSubmit={orderHandler}>
      {formElementsArray.map(el => (
        <Input
          key={el.id}
          elementType={el.config.elementType}
          elementConfig={el.config.elementConfig}
          value={el.config.value}
          changed={event => inputChangedHandler(event, el.id)}
        />
      ))}
      <Button btnType="Success">Submit</Button>
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
