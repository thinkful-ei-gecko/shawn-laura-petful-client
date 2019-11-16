import React, { Component } from 'react';
import config from '../config.js';


class AdoptionQueue extends Component {
  static defaultProps = { cats: [] };

  constructor(props) {
    super(props);
    this.state = {
      newAdopter: '',
      error: ''
    };
  }

  getFormValue = (e) => {
    e.preventDefault();
    let adopter = { full_name: e.target.fullName.value }
    this.handlePostAdopter(adopter);
  }

  handlePostAdopter = (adopter) => {
    let options = {
      method: 'POST',
      body: JSON.stringify(adopter),
      headers: { "Content-Type": "application/json" }
    };
    fetch(`${config.REACT_APP_API_BASE}/user`, options)
    .then(response => {
      if(!response.ok) {
        console.log('Error.');
        throw new Error('Something went wrong');
      }       
      return response;
    })
    .then(response => response.json())
    .then(data => {
      const adopter = data;
      this.setState({newAdopter: adopter});
    })
    .catch(err => console.log('Error with request'))
  }


  render() {

    return (
      <div className='right-column2 adoptInfo'>
        <h2 className='signupTitle'>You Can Adopt!</h2>
        <p>Enter your name here to be added to the list to adopt.</p>

        <form onSubmit = {e => {this.getFormValue(e)}}>
          <label htmlFor='fullName'>Full Name:&#160;
            <input type='text' id='fullName' className='formBox' name='fullName' />
          </label>
          <button type='submit' className='petsBtn'>Sign Up!</button>
        </form>
        <hr/>

        <p>When it is your turn to adopt, your name will be displayed below.</p>
        <p><strong>Next up to adopt:</strong></p>
        <p>...</p>

      </div>
    );
  }
}

export default AdoptionQueue;