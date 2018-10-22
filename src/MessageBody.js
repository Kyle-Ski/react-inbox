import React from 'react';

const MessageBody = ({messages, expandMessageId, targetId}) => {

    const messageWasClicked = (e) => {
        let clicked
        if (expandMessageId.includes(Number(e))){
            clicked = false
        } else {
            clicked = true
        }
        return clicked
    }

    const makeThoseBodies = (mes) => {
        mes.map(message => {
            return (
                <div className={`row message-body ${messageWasClicked(targetId) ? 'hidden' : ''}`}>
                    <div className="col-xs-11 col-xs-offset-1">
                        {message.body}
                    </div>
                </div>
            )
        })
    }
    return (
        <div>
        {makeThoseBodies(messages)}
        </div>
    )
}

export default MessageBody