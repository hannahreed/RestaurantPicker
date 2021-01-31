import logo from './logo.svg';
import './App.css';
import React from 'react';

const {GOOGLE_CLOUD_KEY} = process.env;
var location;
var longitude;
var latitude;
var url;
var placeId;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchAddress: '', searchCuisine: '', searchRadius: '', name: '', address: '', rating: ''};
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

      // fetch address information

      url = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + this.state.searchAddress + '&inputtype=textquery&key=' + GOOGLE_CLOUD_KEY;
      await this.makeApiCall(url)
      .then(response => this.getPlaceId(response))
    
      url = 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + placeId + '&fields=geometry&key=' + GOOGLE_CLOUD_KEY;
      await this.makeApiCall(url)
      .then(response => this.getLocation(response));

      url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=' + this.state.searchRadius + '&type=restaurant&keyword=' + this.state.searchCuisine + '&key=' + GOOGLE_CLOUD_KEY
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
    var options = response.results;

    options = options.filter(restaurant => restaurant.business_status == 'OPERATIONAL');
    options = options.filter(restaurant => restaurant.opening_hours.open_now == true);
    options = options.filter(restaurant => restaurant.rating >= 3.5);


    var rand = Math.floor(Math.random() * options.length);
    var data = options[rand];
    this.setState({
      name: data.name,
      address: data.vicinity,
      rating: data.rating
    });    
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
        <div className="Title"><b>Resto-Roulette</b></div>
        <div>Insert your preferences below</div>
        <input type="text" value={this.state.searchCuisine} onChange={this.handleCuisine} onKeyPress={this.handleKeyPress} placeholder="Cuisine" />
        <input type="text" value={this.state.searchAddress} onChange={this.handleAddress} onKeyPress={this.handleKeyPress} placeholder="Address" />
        <input type="text" value={this.state.searchRadius} onChange={this.handleRadius} onKeyPress={this.handleKeyPress} placeholder="Max Distance (m)" />
        <div className="Results"><b>restaurant: </b> {this.state.name} | <b>address: </b>{this.state.address} | <b>rating:</b> {this.state.rating}</div>
      </div>
    )
  }
} 

export default App;

