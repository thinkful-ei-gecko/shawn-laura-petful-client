import React, { Component } from 'react';
import config from '../config.js';
import { Link } from 'react-router-dom';

class CatDisplay extends Component {
  static defaultProps = { cats: [] };

  constructor(props) {
    super(props);
    this.state = {
      cat: [],
      error: ''
    };
  }

  componentDidMount(){
    fetch(`${config.REACT_APP_API_BASE}/cat`)
    .then(response => {
      if(!response.ok) {
        console.log('Error.');
        throw new Error('Something went wrong'); //throw an error
      }       
      return response;
    })
    .then(response => response.json())
    .then(data => {
      const cat = data;
      this.setState({cat: cat});
    })
    .catch(err => {
      this.setState({ error: err.message });
    });
  }

  render() {

    const cat = this.state.cat;

    return (
      <div className='left-column2'>
      <div className='row2'>
        <div className='columnE'>
          <span className='statusTitle'>
            <h3>Now Available To Adopt</h3>
          </span>
          <div className='petInfo'>
            <div className='petName'>
              <h4>{cat.name}</h4>
            </div>
            <ul className='petStats'>
            <li><span className='statItem'>Breed: </span>{cat.breed}</li>
              <li><span className='statItem'>Age: </span>{cat.age}</li>
              <li><span className='statItem'>Sex: </span>{cat.sex}</li>
              <li><span className='statItem'>Story: </span>{cat.story}</li>
            </ul>
          </div>
          <button type='submit' className='petsBtn smBtn adopt'>Adopt me!</button>
          <div>
            <button type='submit' className='petsBtn smBtn'>View previous</button>
            <button type='submit' className='petsBtn smBtn'>View next</button>
          </div>
        </div>
        <div className='columnF'>
        <img className='petImg' alt={cat.imageDescription} src={cat.imageURL} />
        </div>
      </div>
    </div>

    );
  }
}

export default CatDisplay;