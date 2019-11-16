import React, { Component } from 'react';
import { Button, Input, Required } from './Utils/Utils'
import config from '../config';
//import { Link } from 'react-router-dom';

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pet: '',
      pets: [],
      person: '',
      persons: [],
      name: null,
    }
  }
 
  
  onChangeHandle = (e) => {
		this.setState({
			name: e.target.value,
		})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { name } = this.state;
      fetch(`${config.REACT_APP_API_BASE}/user`, {
      method: 'POST',
      headers: {'content-type':'application/json'},
      body: JSON.stringify({
        full_name: name
      })
    })
    .then(res => 
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
      
    )
    .catch(e => console.error(e))
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
          <label htmlFor='name'>
            Full name:
          </label>
          <Input
            id='name'
            onChange={this.onChangeHandle}
            name='name'
            type='text'
            required
            >
    
          </Input>
        </div>
        <button type='submit'>
          Register
        </button>
        <p>Once you click 'REGISTER' you'll be added to the queue of our adopters.</p>
      </form>
      </div>
    );
  }
}

export default Register;