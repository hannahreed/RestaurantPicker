import logo from './logo.svg';
import './App.css';
import React from 'react';

// export const sendRequest = ({props}) => {
    
//     return body;
//   }


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchString: ''};
    this.handleChange = this.handleChange.bind(this);
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
      fetch('https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + this.state.searchString + '&key=AIzaSyCMBejhSp6tAA-1V5rAa36O7CJ5A1pHkfA')
        .then(response => response.json())
        .then(data => addressData = data)
        .then(data => console.log(data));

      
    }
    
  }

  handleChange(event) {
    this.setState({
      searchString: event.target.value
    });
    console.log("scope updated!")
  }

  render() {
    var searchString = this.state.searchString.trim().toLowerCase();
    
    return (
      <div className="App">
        <input type="text" value={this.state.searchString} onChange={this.handleChange} onKeyPress={this.handleKeyPress} placeholder="Search" />
      </div>
    )
  }
} 

export default App;

