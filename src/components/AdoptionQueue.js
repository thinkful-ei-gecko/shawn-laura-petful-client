import React, { Component } from 'react';
import config from '../config.js';


class AdoptionQueue extends Component {
  static defaultProps = { cats: [] };

  constructor(props) {
    super(props);
    this.state = {
      newAdopter: '',
      nextToAdopt: '',
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

  handleSendToBackOfQueue = () => {
    let options = {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" }
    };
    fetch(`${config.REACT_APP_API_BASE}/user`, options)
    .then(response => {
      if(!response.ok) {
        console.log('Error.');
        throw new Error('Something went wrong'); //throw an error
      }       
      return response;
    })
    .then(response => response.json())
    .catch(err => console.log('Error with request'))

    this.displayNextAdopter();
  }

  displayNextAdopter(){
    fetch(`${config.REACT_APP_API_BASE}/user`)
    .then(response => {
      if(!response.ok) {
        console.log('Error.');
        throw new Error('Something went wrong'); //throw an error
      }       
      return response;
    })
    .then(response => response.json())
    .then(data => {
      const user = data;
      this.setState({nextToAdopt: user});
    })
    .catch(err => {
      this.setState({ error: err.message });
    });

  }

  componentDidMount(){
    this.displayNextAdopter();
  }


  render() {

    const nextUp = this.state.nextToAdopt;
    console.log(nextUp);

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

        <p>The next person in line to adopt will be displayed below.</p>
        <div className='nextUp'>
          <p><strong>Next up to adopt:</strong></p>
          <p><em>--{nextUp}--</em></p>
        </div>
        When adopter's turn is over:
        <button type='submit' className='petsBtn smBtn next'
            onClick={() => this.handleSendToBackOfQueue()} >Remove from queue</button>

      </div>
    );
  }
}

export default AdoptionQueue;