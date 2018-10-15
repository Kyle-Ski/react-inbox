import React from 'react';

const MessageList = ({messages, checkReadStatus, markAsRead, markAsUnread}) => {
    
    const loadMessages = (list) => {
        return list.map((message,i) => {
            let isRead = message.read ? 'unread':'read'
            let isSelected = message.selected ? 'selected':''
            let isStared = message.starred ? '-o':''
            let isChecked = message.selected ? message.selected: false
            return (
                <div key={i} className={`row message ${isRead} ${isSelected}`}>
                    <div className="col-xs-1">
                        <div className="row">
                            <div className="col-xs-2">
                                <input name="checkbox" type="checkbox" checked={isChecked} onChange={message.read ? markAsRead : markAsUnread} value={message.id}/>
                            </div>
                            <div className="col-xs-2">
                                <i className={`star fa fa-star${isStared}`}></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-11">
                        <a href="#">
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