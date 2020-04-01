import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';

const ContactData = props => {
  const [loading, setLoading] = useState(false);
  const [canSubmitForm, setCanSubmitForm] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Name'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Street'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    zipCode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Zip'
      },
      value: '',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5
      },
      valid: false,
      touched: false
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Country'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: 'fastest', displayValue: 'Fastest' },
          { value: 'cheapest', displayValue: 'Cheapest' }
        ]
      },
      value: 'fastest',
      validation: {},
      valid: true
    }
  });

  const orderHandler = event => {
    event.preventDefault();
    setLoading(true);
    const orderData = {};
    for (let field in contactInfo) {
      orderData[field] = contactInfo[field];
    }
    const orderForm = {
      ingredients: props.ingredients,
      price: props.totalPrice,
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

    const updatedFormElement = {
      ...updatedForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );

    updatedFormElement.touched = true;
    updatedForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;

    for (let input in updatedForm) {
      formIsValid = updatedForm[input].valid && formIsValid;
    }
    setCanSubmitForm(formIsValid);
    setContactInfo(updatedForm);
  };

  const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
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
          invalid={!el.config.valid}
          shouldValidate={el.config.validation}
          touched={el.config.touched}
        />
      ))}
      <Button btnType="Success" disabled={!canSubmitForm}>
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

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  };
};

export default connect(mapStateToProps)(ContactData);
