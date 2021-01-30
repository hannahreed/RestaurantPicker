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

  handleKeyPress(event){
    if(event.key == 'Enter') {
      console.log("Enter was pressed");
      console.log("hello");
      var auth = 'AIzaSyCMBejhSp6tAA-1V5rAa36O7CJ5A1pHkfA';
      var body = "";
      var endpoint = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + this.state.searchString + '&key=AIzaSyCMBejhSp6tAA-1V5rAa36O7CJ5A1pHkfA';
      let request = new XMLHttpRequest();
      request.open("GET", endpoint);
      request.send();
      request.onload = () => {
        console.log(request);
        if (request.status == 200) {
          body = JSON.parse(request.response);
          console.log(body);
        } else {
          console.log(`error ${request.status} ${request.statusText}`);
        }
      }
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

