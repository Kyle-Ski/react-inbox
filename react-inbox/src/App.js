import React, { Component } from 'react';
import './App.css';
import ToolBar from './Toolbar';
import MessageList from './MessageList';


class App extends Component {

  state = {
    messages: [],
    isChecked: [],
    checkedItems: [],
    removedItems: []
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8082/api/messages')
    const messages = await response.json()
    console.table(messages)
    this.setState({
      messages: messages,
    })
  }
    
  isChecked = (e) => {
    return this.state.checkedItems.includes(e.value.id) ? 'checked': 'unchecked'
  }

  handleCheck = (e) => {
    let checkedItem = this.state.messages.filter(message => message.id === Number(e.target.value))
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

  checkAll = (e) => {
    e.preventDefault()
    console.log('check all')
  }

  markAsRead = async (e) => {
    e.preventDefault()
    var data = {
      messageIds: this.state.checkedItems,
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
    e.preventDefault()
    var data = {
      messageIds: this.state.checkedItems,
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
        <ToolBar 
          markAsRead={this.markAsRead}
          markAsUnread={this.markAsUnread}
          checkedItems={this.checkedItems}
          checkAll={this.checkAll}
        />
        <MessageList 
          messages={this.state.messages}
          checkReadStatus={this.checkReadStatus}
          checkedItems={this.state.checkedItems}
          markAsStared={this.markAsStared}
          markAsUnstared={this.markAsUnstared}
          handleCheck={this.handleCheck}
        />
      </div>
    );
  }
}

export default App;
