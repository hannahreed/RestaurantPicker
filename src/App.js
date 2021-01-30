import logo from './logo.svg';
import './App.css';
import React from 'react';

// export const sendRequest = ({props}) => {
    
//     return body;
//   }


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchAddress: '', searchCuisine: '', searchRadius: '', name: 'Lola Rosa', address: '123 Milton', phoneNumber: '123-456-7890'};
    this.handleCuisine = this.handleCuisine.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handleRadius = this.handleRadius.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  async makeApiCall(url) {
    // make call
    // await
    // return 
  }

  handleKeyPress(event){
    if(event.key == 'Enter') {
      console.log("Enter was pressed");

      // fetch address information

      // makeApiCall(url).then blah blah blah
      var addressData;
      fetch('https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + this.state.searchAddress + '&key=AIzaSyCMBejhSp6tAA-1V5rAa36O7CJ5A1pHkfA')
        .then(response => response.json())
        .then(data => addressData = data)
        .then(data => console.log(data));

      
    }
    
  }

  handleCuisine(event) {
    this.setState({
      searchCuisine: event.target.value
    });
    console.log("Cuisine updated!")
  }

  handleAddress(event) {
    this.setState({
      searchAddress: event.target.value
    });
    console.log("Address updated!")
  }
  handleRadius(event) {
    this.setState({
      searchRadius: event.target.value
    });
    console.log("Radius updated!")
  }

  render() {

    return (
      <div className="Search">
        <div className="Title"><b>Restaurant Randomizer</b></div>
        <div>Insert your preferences below</div>
        <input type="text" value={this.state.searchCuisine} onChange={this.handleCuisine} onKeyPress={this.handleKeyPress} placeholder="Cuisine" />
        <input type="text" value={this.state.searchAddress} onChange={this.handleAddress} onKeyPress={this.handleKeyPress} placeholder="Address" />
        <input type="text" value={this.state.searchRadius} onChange={this.handleRadius} onKeyPress={this.handleKeyPress} placeholder="Radius" />
        <div className="Results">restaurant: {this.state.name}, address: {this.state.address}, phone: {this.state.phoneNumber}</div>
      </div>
    )
  }
} 

export default App;

