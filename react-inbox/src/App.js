import React, { Component } from 'react';
import './App.css';
import ToolBar from './Toolbar';
import MessageList from './MessageList';


class App extends Component {

  state = {
    messages: []
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8082/api/messages')
    const messages = await response.json()
    console.table(messages)
    console.log(messages)
    this.setState({messages: messages})
  }
    
  

  render() {
    return (
      <div className="App">
        <ToolBar />
        <MessageList messages={this.state.messages}/>
      </div>
    );
  }
}

export default App;
