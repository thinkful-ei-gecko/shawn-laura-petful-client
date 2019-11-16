import React, { Component } from 'react';
import { Button, Input, Required } from '../Utils/Utils'
//import { Link } from 'react-router-dom';

class Registration extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  }

  state = { error: null }


  handleSubmit = e => {
    e.preventDefault()
    const { name, email } = e.target

    console.log('Registration form submitted')
    console.log({ name, email })

    name.value = ''
    email.value = ''
    this.props.onRegistrationSuccess()
  }


  render() {
    const { error } = this.state
    return (
      <div className='right-column2 adoptInfo'>
        <h2 className='signupTitle'>Want to adopt?</h2>
        <p>Join our queue of adopters by telling us a bit about yourself.</p>
        <form
        className='RegistrationForm'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='name'>
          <label htmlFor='RegistrationForm__name'>
            Full name: <Required />
          </label>
          <Input
            name='name'
            type='text'
            required
            id='RegistrationForm__name'>
          </Input>
        </div>
        <div className='email'>
          <label htmlFor='RegistrationForm__email'>
            Email address: <Required />
          </label>
          <Input
            name='email'
            type='email'
            required
            id='RegistrationForm__email'>
          </Input>
        </div>

        <Button type='submit'>
          Register
        </Button>
        <p>Once you click 'REGISTER' you'll be added to the queue of our adopters.</p>
      </form>
      </div>
    );
  }
}

export default Registration;