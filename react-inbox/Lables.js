import React from 'react';

const Lables = ({messages}) => {
    let labels = messages.map(message => {
    return message.labels
    })
    labels.map(item => {
        return (
            <span class="label label-warning">{item}</span>
        )
    })
}

export default Lables