import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

class LandingPage extends Component{
  render(){
    return(<>

<header>
    <h1>Petful</h1>
  </header>
  <main>
    <section className='row'>
      <div className='columnA'>
        <div className='left-column'></div>
      </div>
      <div className='columnB'>
        <div className='right-column appInfo'>
            <p className='welcome'>Welcome!</p>
            <p>Petful is a unique animal adoption program. 
              We are committed to making sure that all of our furry friends 
              have a new home as quickly as possible, so it is our policy that 
              our animals are adopted in the order they arrive. 
            </p>
            <p>The next cat or dog available for adoption 
                is always the one that has been in our care the longest.
            </p>
            <div className='goTo'>Continue</div>
        </div>
      </div>

    </section>
  </main>


    </>);
  }
}
export default LandingPage;