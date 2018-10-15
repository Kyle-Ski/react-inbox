import React from 'react';

const MessageList = ({messages}) => {
    const loadMessages = (list) => {
        return list.map((message,i) => {
            return (
        <div className="row message unread">
            <div className="col-xs-1">
                <div className="row">
                    <div className="col-xs-2">
                        <input type="checkbox" />
                    </div>
                    <div className="col-xs-2">
                        <i className="star fa fa-star"></i>
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