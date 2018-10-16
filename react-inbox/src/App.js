import React, { Component } from 'react';
import './App.css';
import ToolBar from './Toolbar';
import MessageList from './MessageList';


class App extends Component {

  state = {
    messages: [],
    checkedItems: [],
    removedItems: [],
    addLable: [],
    removeLable: []
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

  addLable = (e) => {
    console.log(e.target.value)
    this.setState({addLable: e.target.value})
  }

  removeLable = (e) => {
    this.setState({removeLable: e.target.value})
  }

  checkAll = (e) => {
    e.preventDefault()
    let messageIds = this.state.messages.map(message => message.id)
    let notIncludedIds = this.state.messages.filter(message => !(this.state.checkedItems.includes(message.id)))
    let idsToAdd = notIncludedIds.map(item => item.id)
    let lables = this.state.messages.filter(message => message.labels.length !== 0).map(message => message.labels)
    console.log(this.state.checkedItems.splice(0, this.state.checkedItems.length))
    if(this.state.checkedItems.length === this.state.messages.length){
      this.setState({checkedItems: this.state.checkedItems.splice(0, this.state.checkedItems.length)})
    } else if(!(this.state.checkedItems.includes(messageIds))) {
      this.setState({checkedItems: this.state.checkedItems.concat(idsToAdd)})
    }
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
          addLable={this.addLable}
          removeLable={this.removeLable}
        />
        <MessageList 
          messages={this.state.messages}
          checkReadStatus={this.checkReadStatus}
          checkedItems={this.state.checkedItems}
          markAsStared={this.markAsStared}
          markAsUnstared={this.markAsUnstared}
          handleCheck={this.handleCheck}
          handleDopdown={this.handleDopdown}
        />
      </div>
    );
  }
}

export default App;
