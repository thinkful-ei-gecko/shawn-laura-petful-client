import React, { Component } from 'react';
import config from '../config.js';

class DogDisplay extends Component {
  static defaultProps = { dog: [] };

  constructor(props) {
    super(props);
    this.state = {
      dog: [],
      error: ''
    };
  }

  displayNextDog(){
    fetch(`${config.REACT_APP_API_BASE}/dog`)
    .then(response => {
      if(!response.ok) {
        console.log('Error.');
        throw new Error('Something went wrong'); //throw an error
      }       
      return response;
    })
    .then(response => response.json())
    .then(data => {
      const dog = data;
      this.setState({dog: dog});
    })
    .catch(err => {
      this.setState({ error: err.message });
    });
  }

  componentDidMount(){
   // this.props.verifyTurn();
    this.displayNextDog();
  }

  handleAdoptDog = () => {
    let options = {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" }
    };
    fetch(`${config.REACT_APP_API_BASE}/dog`, options)
    .then(response => {
      if(!response.ok) {
        console.log('Error.');
        throw new Error('Something went wrong'); //throw an error
      }       
      return response;
    })
    .then(response => response.json())
    .then(data => {
      const dog = data;
      this.setState({dog: dog});
    })
    .catch(err => console.log('Error with request'))
  }

  handleClickAdopt = () => {
    let status = this.props.turn;
    console.log(status);
    if (status === true) {
      this.handleAdoptDog();
    }
    else {
      console.log('not adopting');
    }
  }

  render() {
    const dog = this.state.dog;
    const turnMessage = this.props.currentUser ? this.props.message : '';

    return (
      <div className='left-column2'>
      <div className='row2'>
        <div className='columnE'>
          <span className='statusTitle'>
            <h3>Now Available To Adopt</h3>
          </span>
          <div className='petInfo'>
            <div className='petName'>
              <h4>{dog.name}</h4>
            </div>
            <ul className='petStats'>
              <li><span className='statItem'>Breed: </span>{dog.breed}</li>
              <li><span className='statItem'>Age: </span>{dog.age}</li>
              <li><span className='statItem'>Sex: </span>{dog.sex}</li>
              <li><span className='statItem'>Story: </span>{dog.story}</li>
            </ul>
          </div>
          <button type='button' className='petsBtn smBtn adopt'
            onClick={() => this.handleClickAdopt()} >ADOPT!</button>
            <p role="alert" className="alert">{turnMessage}</p>
        </div>
        <div className='columnF'>
          <img className='petImg' alt={dog.imageDescription} src={dog.imageURL} />
        </div>
      </div>
    </div>

    );
  }
}

export default DogDisplay;

/* for future dev:
          <div>
            <button type='submit' className='petsBtn smBtn'>View previous</button>
            <button type='submit' className='petsBtn smBtn'>View next</button>
          </div>
*/