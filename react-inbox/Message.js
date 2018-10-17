import React from 'react';

const Message = (props) => {
    const getBody = (arr) => {
        return arr.map(message => message.body).join()
    }
    return (
        <div class="row message-body">
            <div class="col-xs-11 col-xs-offset-1">
                {getBody(props.messageList)}
            </div>
            </div>
    )
}

export default Message