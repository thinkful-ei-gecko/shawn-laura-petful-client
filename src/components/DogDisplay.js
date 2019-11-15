import React, { Component } from 'react';
import config from '../config.js';
import { Link } from 'react-router-dom';

class DogDisplay extends Component {
  static defaultProps = { dogs: [] };

  constructor(props) {
    super(props);
    this.state = {
      dog: [],
      error: ''
    };
  }

  componentDidMount(){
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


  render() {
    
    const dog = this.state.dog;


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
          <button type='submit' className='petsBtn smBtn adopt'>Adopt me!</button>
          <div>
            <button type='submit' className='petsBtn smBtn'>View previous</button>
            <button type='submit' className='petsBtn smBtn'>View next</button>
          </div>
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