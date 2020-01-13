import React, { Component } from 'react';
import config from '../config.js';


class AdoptionQueue extends Component {
  static defaultProps = { allAdopters: [] };

  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }

  getFormValue = (e) => {
    e.preventDefault();
    let adopter = { full_name: e.target.fullName.value }
    e.target.reset();
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
      this.props.trackUser(adopter);
      this.props.verifyTurn();
      this.displayNextAdopter();
    })
    .catch(err => console.log('Error with request'))
  }

  handleSendToBackOfQueue = () => {
    let options = {
      method: 'PATCH',
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
    .then(data => {
      const userLineup = data;
      console.log(userLineup);
      this.props.trackAdopters(userLineup);
      this.props.trackNextAdopter(userLineup[0]);
      this.props.verifyTurn();
    })
    .catch(err => console.log('Error with request'))
  }

  removeAdopterFromList(){
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
    .then(data => {
      let deletedUser = data[0];
      let userLineup = data[1];
//      console.log(userLineup);
//      console.log(deletedUser);
      if (this.props.currentUser === deletedUser){
        this.props.trackUser('');
      }
      this.props.trackAdopters(userLineup);
      this.props.trackNextAdopter(userLineup[0]);
      this.props.verifyTurn();
    })
    .catch(err => console.log('Error with request'))
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
      const userLineup = data;
      //console.log(userLineup);
      this.props.trackAdopters(userLineup);
      this.props.trackNextAdopter(userLineup[0]);
      this.props.verifyTurn();
    })
    .catch(err => {
      this.setState({ error: err.message });
    });
  }

  componentDidMount(){
    this.displayNextAdopter();
  }

  render() {

    const nextUp = this.props.currentAdopter;
    const adopterQueue = this.props.adoptersList.map((person, idx) => <li key={idx} >{person}</li>);

    return (
      <div className='right-column2 adoptInfo'>
        <h2 className='signupTitle'>You Can Adopt!</h2>
        <p className='lineUpP'>Add your name to the list.</p>

        <form onSubmit = {e => {this.getFormValue(e)}}>
          <label htmlFor='fullName'>Full Name:&#160;
            <input type='text' id='fullName' className='formBox' name='fullName' />
          </label>
          <button type='submit' className='petsBtn'>Sign Up!</button>
        </form>
        <hr/>

        <div className='nextUp'>
          <p className='nextPerson'><strong>Next up to adopt:</strong></p>
          <p className='firstInLine'>{nextUp}</p>
          <p className='lineUpInfo'><strong>TO ADOPT: </strong>Click "ADOPT" to take the animal off the list, THEN "Leave" to remove yourself from the queue.</p>
          <p className='lineUpInfo'><strong>TO WAIT: </strong>To wait for a different animal, go to the end of the line.</p>
          <button type='button' className='petsBtn smBtn next'
            onClick={() => this.removeAdopterFromList()} >Leave</button>
          <button type='button' className='petsBtn smBtn next'
            onClick={() => this.handleSendToBackOfQueue()} >Go to end of queue</button>

        </div>
        <p className='queueTitle'>Waiting list:</p>
        <ol className='queue'>{adopterQueue}</ol>
      </div>
    );
  }
}

export default AdoptionQueue;