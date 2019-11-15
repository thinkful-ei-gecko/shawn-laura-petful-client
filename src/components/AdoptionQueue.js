import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AdoptionQueue extends Component {
  static defaultProps = { cats: [] };


  render() {

    return (
      <div className='right-column2 adoptInfo'>
        <h2 className='signupTitle'>How To Adopt</h2>
        <p>The next in line to adopt: </p>
        <p>Enter your name to be in the queue to adopt...</p>
        <form>
          <label for='firstName'>First name:&nbsp;
            <input type='text' id='firstName' className='formBox' />
          </label>
          <br />
          <label for='lastName'>Last name:&nbsp;
            <input type='text' id='lastName' className='formBox' />
          </label>
          <button type='submit' className='petsBtn'>Add me to the queue!</button>
        </form>
      </div>
    );
  }
}

export default AdoptionQueue;