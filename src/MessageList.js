import React from 'react';
import SingleMessage from './SingleMessage';

const MessageList = ({messages, handleCheck, markAsUnstared, markAsStared, checkedItems, expandThatMessage, targetId}) => {

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
                <SingleMessage key={i}
                    message={message}
                    isRead={isRead}
                    isStared={isStared}
                    checkedStyle={checkedStyle}
                    id={id}
                    handleCheck={handleCheck}
                    markAsStared={markAsStared}
                    markAsUnstared={markAsUnstared}
                    checkedItems={checkedItems}
                    expandThatMessage={expandThatMessage}
                    selected={selected}
                />
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
