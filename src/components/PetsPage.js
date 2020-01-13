import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './PetsPage.css';
import DogDisplay from './DogDisplay';
import CatDisplay from './CatDisplay';
import AdoptionQueue from './AdoptionQueue';

class PetsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      currentAdopter: '',
      adoptersList: [],
      turn: false,
      turnMessage: '',
      error: ''
    };
  }

  trackAdopters = (adopters) => {
    this.setState({
      adoptersList: adopters
    });
  }

  trackNextAdopter = (adopter) => {
    this.setState({
      currentAdopter: adopter
    });
  }

  trackUser = (user) => {
    this.setState({
      currentUser: user
    });
  }

  verifyTurn = () => {
    let user = this.state.currentUser;
    console.log(user);
    let adopter = this.state.currentAdopter;
    console.log(adopter);
    if (user === adopter) {
      this.setState({ turn: true });
      this.setState({turnMessage: 'YOUR TURN TO ADOPT!'})
      console.log('matched');
    }
    else if (user !== adopter) {
      console.log('not matched');
      this.setState({ turn: false });
      this.setState({turnMessage: 'NOT YET!'})
    }
  }


  render() {
    return (<>

      <section className='row background1'>

        <div className='columnC'>
        <Link to='/'><h1 className='pg2title'>Petful</h1></Link>

          <DogDisplay 
            currentUser={this.state.currentUser} 
            currentAdopter={this.state.currentAdopter} 
            verifyTurn={this.verifyTurn}
            turn={this.state.turn} 
            message={this.state.turnMessage} >
          </DogDisplay>

          <CatDisplay 
            currentUser={this.state.currentUser} 
            currentAdopter={this.state.currentAdopter} 
            verifyTurn={this.verifyTurn}
            turn={this.state.turn}
            message={this.state.turnMessage} >
          </CatDisplay>
        </div>

        <div className='columnD'>

          <AdoptionQueue 
            currentUser={this.state.currentUser}
            currentAdopter={this.state.currentAdopter}
            adoptersList={this.state.adoptersList}
            trackAdopters={this.trackAdopters} 
            trackNextAdopter={this.trackNextAdopter} 
            trackUser={this.trackUser} 
            verifyTurn={this.verifyTurn} >
          </AdoptionQueue>          
        </div>

      </section>

    </>);
  }
}
export default PetsPage;