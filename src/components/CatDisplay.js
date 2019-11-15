import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CatDisplay extends Component {
  static defaultProps = { cats: [] };


  render() {

    return (
      <div className='left-column2'>
      <div className='row2'>
        <div className='columnE'>
          <span className='statusTitle'>
            <h3>Now Available To Adopt</h3>
          </span>
          <div className='petInfo'>
            <div className='petName'>
              <h4>Meowly</h4>
            </div>
            <ul className='petStats'>
              <li><span className='statItem'>Breed: </span> kitty</li>
              <li><span className='statItem'>Age: </span>4 years</li>
              <li><span className='statItem'>Sex: </span>Male</li>
              <li><span className='statItem'>Story: </span>Family moved</li>
            </ul>
          </div>
          <button type='submit' className='petsBtn smBtn adopt'>Adopt me!</button>
          <div>
            <button type='submit' className='petsBtn smBtn'>View previous</button>
            <button type='submit' className='petsBtn smBtn'>View next</button>
          </div>
        </div>
        <div className='columnF'>
          <img className='petImg' alt='' src='./src/cat1.jpg' />
        </div>
      </div>
    </div>

    );
  }
}

export default CatDisplay;