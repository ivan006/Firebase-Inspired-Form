import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import axios from 'axios';
// import FileUpload from './FileUpload';
import Data from './Data';

export default class App extends Component {
  render() {
    return (
      <div className="w3-container w3-card w3-white w3-round w3-margin">
        <Data />
        {/*<FileUpload />*/}
      </div>
    );
  }
}
