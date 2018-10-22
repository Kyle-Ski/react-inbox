import React from 'react';

const MessageList = ({messages, handleCheck, markAsUnstared, markAsStared, checkedItems, expandThatMessage, targetId}) => {

    const selected = (id) => {
        if (checkedItems.includes(id)){
            return true
        } else {
            return false
        }
    }

    const expandYo = (id) => {
        if(id == targetId){
            return ''
            } else {
            return 'hidden'
            }
    }

    const loadMessages = (list) => {
        return list.map((message,i) => {
            let isRead = message.read ? 'unread':'read'
            let isStared = message.starred ? '':'-o'
            let checkedStyle = checkedItems.includes(message.id) ? 'selected' : ''
            let id = message.id
            return (
                <div key={i}>
                <div id={id} className={`row clickable-row message ${isRead} ${checkedStyle}`}>
                    <div className="col-xs-1">
                        <div className="row">
                            <div className="col-xs-2">
                                <input className="checkbox" type="checkbox" checked={selected(id)} onChange={handleCheck} value={message.id}/>
                            </div>
                            <div className="col-xs-2">
                                <i id={message.id} onClick={message.starred ? markAsUnstared : markAsStared} className={`star fa fa-star${isStared}`}></i>
                            </div>
                        </div>
                    </div>
                    <div id={id} className="col-xs-11">
                    <span className="label label-warning">{message.labels[0]}</span>
                    <span className="label label-warning">{message.labels[1]}</span>
                    <span className="label label-warning">{message.labels[2]}</span>
                        <a id={id} onClick={expandThatMessage}>
                            {message.subject}
                        </a>
                    </div>
                </div> 
                <div className={`row message-body ${expandYo(id)}`}>
                    <div className="col-xs-11 col-xs-offset-1">
                        {message.body}
                    </div>
                </div>
                </div>
            )
        })
    }
    return (
        <div>
        {loadMessages(messages)}
        </div>
    )
}

export default MessageList
