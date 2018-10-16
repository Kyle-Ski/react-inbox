import React from 'react';

const MessageList = ({messages, handleCheck, markAsUnstared, markAsStared, isChecked, checkedItems, handleDropdown}) => {

    const loadMessages = (list) => {
        return list.map((message,i) => {
            let isRead = message.read ? 'unread':'read'
            let isStared = message.starred ? '':'-o'
            let checkedStyle = checkedItems.includes(message.id) ? 'selected' : ''
            
            return (
                <div key={i} className={`row message ${isRead} ${checkedStyle}`}>
                    <div className="col-xs-1">
                        <div className="row">
                            <div className="col-xs-2">
                                <input name="checkbox" type="checkbox" checked={isChecked} onChange={handleCheck} value={message.id}/>
                            </div>
                            <div className="col-xs-2">
                                <i id={message.id} onClick={message.starred ? markAsUnstared : markAsStared} className={`star fa fa-star${isStared}`}></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-11">
                        <span className='label label-warning'>{''}</span>
                        <span className='label label-warning'>{''}</span>
                        <a href="https://www.google.com">
                            {message.subject}
                        </a>
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
//message.read ? markAsRead : markAsUnread