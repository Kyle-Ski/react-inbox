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
      checkedItems: [],
      removedItems: []
    })
  }
    
  handleCheck = (e) => {
    let checkedItem = this.state.messages.filter(message => message.id === Number(e.target.value))
    console.log('checkedItem',checkedItem[0].id)
    let index = this.state.checkedItems.indexOf(checkedItem[0].id)
    if(!(this.state.checkedItems.includes(checkedItem[0].id))){
      this.setState({checkedItems: this.state.checkedItems.concat(checkedItem[0].id)})
    } else {
      this.setState({removedItems: this.state.checkedItems.splice(index,1)})
    }
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
    this.setState({
      messages: patched
    })
  }

  markAsRead = async (e) => {
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
    this.setState({
      messages: patched
    })
  }

  markAsUnread = async (e) => {
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
    this.setState({
      messages: patched
    })
  }


  render() {

    return (
      <div className="App">
        <ToolBar />
        <MessageList 
          messages={this.state.messages}
          checkReadStatus={this.checkReadStatus}
          checkedItems={this.state.checkedItems}
          markAsRead={this.markAsRead}
          markAsUnread={this.markAsUnread}
          markAsStared={this.markAsStared}
          markAsUnstared={this.markAsUnstared}
          handleCheck={this.handleCheck}
        />
      </div>
    );
  }
}

export default App;
