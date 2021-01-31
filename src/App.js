import logo from './logo.svg';
import './App.css';
import React from 'react';

// export const sendRequest = ({props}) => {
    
//     return body;
//   }

var auth = 'AIzaSyCMBejhSp6tAA-1V5rAa36O7CJ5A1pHkfA';
var body;
var address = "3897 st urbain";
var endpoint;
let request = new XMLHttpRequest();
var location;
var url;
var placeId;
var data;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchAddress: '', searchCuisine: '', searchRadius: '', name: 'Lola Rosa', address: '123 Milton', phoneNumber: '123-456-7890'};
    this.handleCuisine = this.handleCuisine.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handleRadius = this.handleRadius.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }

  async makeApiCall(url) {
    // make call
    // await
    // return 

    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json'
      },
    });
    return response.json();
  }

  handleKeyPress(event){
    if(event.key == 'Enter') {
      console.log("Enter was pressed");

      // fetch address information

      // makeApiCall(url).then blah blah blah
      // var addressData;
      // fetch('https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + this.state.searchAddress + '&key=AIzaSyCMBejhSp6tAA-1V5rAa36O7CJ5A1pHkfA')
      //   .then(response => response.json())
      //   .then(data => addressData = data)
      //   .then(data => console.log(data));

      url = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + address + '&inputtype=textquery&key=' + auth;
      this.makeApiCall(url)
      .then(response => this.getPlaceId(response))
      // Promise.resolve();
      // console.log(placeId);
      // url = 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + this.placeId + '&fields=geometry&key=' + auth;

      url = 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + placeId + '&fields=geometry&key=' + auth;
      console.log(url);
      this.makeApiCall(url)
      .then(response => this.getLocation(response));
    }
    
  }

  async getPlaceId(response) {
    placeId = response.candidates[0].place_id;
    console.log(placeId);
    // url = 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + placeId + '&fields=geometry&key=' + auth
    // console.log(url);
  }

  async getLocation(response) {
    console.log(response);
    // location = response.geometry.location;
    console.log(location);
  }  

  // getLocation(address) {
  //   url = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + address + '&inputtype=textquery&key=' + auth;
  //   const response = await fetch(url, {
  //     method: 'GET',
  //     mode: 'cors', // no-cors, *cors, same-origin
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //   });
  //   // console.log(response.json());
  //   return response.json();
  // }      


  // async getDeliveryLocation() {
  //   let resp = getLocation("3897 st urbain");
  //   // console.log()
  //   placeId = resp.candidates[0].place_id;
  //   url = 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + placeId + '&fields=geometry&key=' + auth;
  //   const response = await fetch(url, {
  //     method: 'GET',
  //     mode: 'cors', // no-cors, *cors, same-origin
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //   });

  //   let body = await response.json();
  //   loc = body.result.geometry.location;
  //   // console.log(loc);
  // }

  // getOptions() {
  //   var endpoint = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + '&inputtype=textquery&key=' + auth;
    
  // }

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

