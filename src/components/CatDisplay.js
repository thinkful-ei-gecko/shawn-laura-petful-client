import React, { Component } from 'react';
import config from '../config.js';

class CatDisplay extends Component {
  static defaultProps = { cat: [] };

  constructor(props) {
    super(props);
    this.state = {
      cat: [],
      error: ''
    };
  }

  displayNextCat(){
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
      //console.log(cat);
      this.setState({cat: cat});
    })
    .catch(err => {
      this.setState({ error: err.message });
    });
  }

  componentDidMount(){
    //this.props.verifyTurn();
    this.displayNextCat();
  }

  handleAdoptCat = () => {
    let options = {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" }
    };
    fetch(`${config.REACT_APP_API_BASE}/cat`, options)
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
    .catch(err => console.log('Error with request'))
  }

  handleClickAdopt = () => {
    let status = this.props.turn;
    console.log(status);
    if (status === true) {
      this.handleAdoptCat();
    }
    else {
      console.log('not adopting');
    }
  }

  render() {
    const cat = this.state.cat;
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
              <h4>{cat.name}</h4>
            </div>
            <ul className='petStats'>
            <li><span className='statItem'>Breed: </span>{cat.breed}</li>
              <li><span className='statItem'>Age: </span>{cat.age}</li>
              <li><span className='statItem'>Sex: </span>{cat.sex}</li>
              <li><span className='statItem'>Story: </span>{cat.story}</li>
            </ul>
          </div>
          <button type='button' className='petsBtn smBtn adopt'
            onClick={() => this.handleClickAdopt()} >ADOPT!</button>
            <p role="alert" className="alert">{turnMessage}</p>
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

/* for future dev:

          <div>
            <button type='submit' className='petsBtn smBtn'>View previous</button>
            <button type='submit' className='petsBtn smBtn'>View next</button>
          </div>
*/