import React from 'react';
import Message from './Message';

const MessageList = ({messages, handleCheck, markAsUnstared, markAsStared, isChecked, checkedItems, isClicked, expand}) => {

    const selected = (id) => {
        if (checkedItems.includes(id)){
            return true
        } else {
            return false
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
                <div className={`row message ${isRead} ${checkedStyle}`}>
                    <div className="col-xs-1">
                        <div className="row">
                            <div className="col-xs-2">
                                <input name="checkbox" type="checkbox" checked={selected(id)} onChange={handleCheck} value={message.id}/>
                            </div>
                            <div className="col-xs-2">
                                <i id={message.id} onClick={message.starred ? markAsUnstared : markAsStared} className={`star fa fa-star${isStared}`}></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-11">
                        <span className='label label-warning'>{''}</span>
                        <span className='label label-warning'>{''}</span>
                        <div onClick={isClicked} >
                            {message.subject}
                        </div>
                    </div>
                </div>
                {expand && <Message MessageList={messages}/>}
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
