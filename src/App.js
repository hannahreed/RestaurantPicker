import logo from './logo.svg';
import './App.css';
import React from 'react';

var auth = 'AIzaSyCMBejhSp6tAA-1V5rAa36O7CJ5A1pHkfA';
var body;
var address = "3897 st urbain";
var endpoint;
let request = new XMLHttpRequest();
var location;
var longitude;
var latitude;
var url;
var placeId;
var data;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchAddress: '', searchCuisine: '', searchRadius: '', name: '', address: '', openNow: false};
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

  async handleKeyPress(event){
    if(event.key == 'Enter') {
      console.log("Enter was pressed");

      // fetch address information

      url = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + this.state.searchAddress + '&inputtype=textquery&key=' + auth;
      console.log(url)
      await this.makeApiCall(url)
      .then(response => this.getPlaceId(response))
    
      url = 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + placeId + '&fields=geometry&key=' + auth;
      console.log(url);
      await this.makeApiCall(url)
      .then(response => this.getLocation(response));

      url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=' + this.state.searchRadius + '&type=restaurant&keyword=' + this.state.searchCuisine + '&key=' + auth
      console.log("last url: " + url);
      await this.makeApiCall(url)
      .then(response => this.getOptions(response));
    }
    
  }

  getPlaceId(response) {
    placeId = response.candidates[0].place_id;
  }

  getLocation(response) {
    location = response.result.geometry.location;
    latitude = location.lat;
    longitude = location.lng;
  }

  getOptions(response) {
    console.log(response);
    console.log(response.results);
    var rand = Math.floor(Math.random() * response.results.length);
    var data = response.results[rand]
    var open = data.opening_hours.open_now ? "yes":"no"
    this.setState({
      name: data.name,
      address: data.vicinity,
      openNow: open
    });
    // Need to get results from response and display them
    
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
        <div className="Results"><b>restaurant: </b> {this.state.name} | <b>address: </b>{this.state.address} | <b>open now?:</b> {this.state.openNow}</div>
      </div>
    )
  }
} 

export default App;

