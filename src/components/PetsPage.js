import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './PetsPage.css';
import DogDisplay from './DogDisplay';
import CatDisplay from './CatDisplay';
import AdoptionQueue from './AdoptionQueue';

class PetsPage extends Component {
  render() {
    return (<>

      <section className='row background'>
        <div className='columnC'>
          <DogDisplay>
          </DogDisplay>

          <CatDisplay>
          </CatDisplay>
        </div>

        <div className='columnD'>
          <Link to='/'>
            <h1 className='pg2title'>Petful</h1>
          </Link>

          <AdoptionQueue>
          </AdoptionQueue>
        </div>
      </section>

    </>);
  }
}
export default PetsPage;