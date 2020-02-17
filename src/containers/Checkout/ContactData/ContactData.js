import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css';

const ContactData = props => {
  const [setContactInfo, contactInfo] = useState({
    name: '',
    email: '',
    address: {
      street: '',
      zipCode: ''
    }
  });
  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      <form>
        <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
        <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
        <input className={classes.Input} type="text" name="street" placeholder="Your Street" />
        <input className={classes.Input} type="text" name="zipCode" placeholder="Your Zip Code" />
        <Button btnType="Success">Submit</Button>
      </form>
    </div>
  );
};

export default ContactData;
