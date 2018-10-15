import React, { Component } from 'react';
import './App.css';
import ToolBar from './Toolbar';
import MessageList from './MessageList';


class App extends Component {

  state = {
    messages: [],
    isChecked: []

  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8082/api/messages')
    const messages = await response.json()
    console.table(messages)
    const checkBox = messages.map((item, i) =>{
      let obj = {}
      obj[item.id] = item.read
      return obj
    })
    this.setState({
      messages: messages,
      isChecked: checkBox
    })
  }
    
  markAsStared = async (e) => {
    var data = {
      messageIds: [e.target.id],
      command: 'star',
      starred: true
    }
    const response = await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const patched = await response.json()
    console.log('returned from post', patched)
    this.setState({
      messages: patched
    })
  }

  markAsUnstared = async (e) => {
    var data = {
      messageIds: [e.target.id],
      command: 'star',
      starred: false
    }
    const response = await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const patched = await response.json()
    console.log('returned from post', patched)
    this.setState({
      messages: patched
    })
  }

  markAsRead = async (e) => {
    console.log(e.target.value)
    var data = {
      messageIds: [e.target.value],
      command: 'read',
      read: false
    }
    const response = await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const patched = await response.json()
    console.log('returned from post', patched)
    this.setState({
      messages: patched
    })
  }

  markAsUnread = async (e) => {
    console.log(e.target.value)
    var data = {
      messageIds: [e.target.value],
      command: 'read',
      read: true
    }
    const response = await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const patched = await response.json()
    console.log('returned from post', patched)
    this.setState({
      messages: patched
    })
  }

  checkReadStatus = (e) =>{
    console.log(e.target.value)
  }

  render() {
    return (
      <div className="App">
        <ToolBar />
        <MessageList 
          messages={this.state.messages}
          checkReadStatus={this.checkReadStatus}
          isChecked={this.state.isChecked}
          markAsRead={this.markAsRead}
          markAsUnread={this.markAsUnread}
          markAsStared={this.markAsStared}
          markAsUnstared={this.markAsUnstared}
        />
      </div>
    );
  }
}

export default App;
