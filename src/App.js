import React, { Component } from 'react';
import './App.css';
import ToolBar from './Toolbar';
import MessageList from './MessageList';
import Message from './Message';

class App extends Component {

  state = {
    
    messages: [],
    checkedItems: [],
    removedItems: [],
    isClicked: false,
    subject: '',
    body: '',
    checkAllButton: false,
    expandMessageId: [],
    removeExpandMessageId: [],
    targetId: null,
    count: 0
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8082/api/messages')
    const messages = await response.json()
    console.table(messages)
    this.setState({
      messages: messages,
    })
  }
    

  
  makeThatPatch = async (command, lable, ids) => {
    let data = {
      messageIds: ids,
      command: `${command}`,
      label: lable
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

  submit = async (e) => {
    e.preventDefault()
    let data = {
      id: this.state.messages.length + 1,
      subject: this.state.subject,
      body: this.state.body,
      read: false,
      starred: false,
      labels: []
    }
    const response = await fetch('http://localhost:8082/api/messages', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const patched = await response.json()
    this.setState({
      messages: [...this.state.messages, patched]
    })

  }

  expandThatMessage = (e) => {
    let clickedMessage = this.state.messages.filter(item => item.id === Number(e.target.id))
    let index = this.state.expandMessageId.indexOf(Number(e.target.id))
    if(!(this.state.expandMessageId.includes(clickedMessage[0].id))){
      this.setState({
        expandMessageId: this.state.expandMessageId.concat(clickedMessage[0].id),
      })
    } else {
      this.setState({
        removeExpandMessageId: this.state.expandMessageId.splice(index, 1),
      })
    }
    this.setState({targetId: e.target.id})
}

  deleteThis = async (array) => {
    let data = {
      messageIds: array,
      command: 'delete'
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

  getSubject = (e) => {
    this.setState({subject: e.target.value})
  }

  getBody = (e) => {
    this.setState({body: e.target.value})
  }

  takeThatLabelOff = async (label, array) => {
    if (label !== 'Apply label'){
      this.makeThatPatch('removeLabel', label, array)
    }
  }

  putThatLabelOn = async (label, array) => {
    this.makeThatPatch('addLabel', label, array)
  } 

  changeClick = (e) => {
    e.preventDefault()
    this.setState({isClicked: !(this.state.isClicked)})
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
    this.makeThatPatch('star', true, [e.target.id])
  }

  markAsUnstared = async (e) => {
    this.makeThatPatch('star', false, [e.target.id])
  }


  removeLable = (e) => {
    this.setState({removeLable: e.target.value})
  }

  checkAll = (e) => {
    e.preventDefault()
    let messageIds = this.state.messages.map(message => message.id)
    let notIncludedIds = this.state.messages.filter(message => !(this.state.checkedItems.includes(message.id)))
    let idsToAdd = notIncludedIds.map(item => item.id)
    if(this.state.checkedItems.length === this.state.messages.length){
      this.setState({checkedItems: []})
    } else if(!(this.state.checkedItems.includes(messageIds))) {
      this.setState({checkedItems: this.state.checkedItems.concat(idsToAdd)})
    }
    this.setState({checkAllButton: !(this.state.checkAllButton)})
  }

  markAsRead = async (e) => {
    e.preventDefault()
    this.makeThatPatch('read', false, this.state.checkedItems)
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
          checkedItems={this.state.checkedItems}
          checkAll={this.checkAll}
          addLable={this.addLable}
          removeLable={this.removeLable}
          messages={this.state.messages}
          putThatLabelOn={this.putThatLabelOn}
          takeThatLabelOff={this.takeThatLabelOff}
          changeClick={this.changeClick}
          isClicked={this.state.isClicked}
          deleteThis={this.deleteThis}
          checkAllButton={this.state.checkAllButton}
        />
        <Message 
          isClicked={this.state.isClicked}
          getSubject={this.getSubject}
          getBody={this.getBody}
          submit={this.submit}
        />
        <MessageList 
          messages={this.state.messages}
          checkedItems={this.state.checkedItems}
          markAsStared={this.markAsStared}
          markAsUnstared={this.markAsUnstared}
          handleCheck={this.handleCheck}
          expand={this.state.isClicked}
          expandMessage={this.state.expandMessage}
          expandThatMessage={this.expandThatMessage}
          expandMessageId={this.state.expandMessageId}
          targetId={this.state.targetId}
        />
      </div>
    );
  }
}

export default App;