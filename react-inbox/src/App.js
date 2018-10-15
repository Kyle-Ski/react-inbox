import React, { Component } from 'react';
import './App.css';
import ToolBar from './Toolbar';
import MessageList from './MessageList';


class App extends Component {
  render() {
    return (
      <div className="App">
        <ToolBar />
        <MessageList />
      </div>
    );
  }
}

export default App;
