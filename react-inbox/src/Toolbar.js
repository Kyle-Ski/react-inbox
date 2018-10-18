import React from 'react';

const ToolBar = ({messages, markAsRead, markAsUnread, checkAll, removeLable, checkedItems, putThatLabelOn}) => {

    const addLable = (e) => {
        e.preventDefault()
        console.log('value',e.target.value)
        let checkedMessages = messages.filter(message => checkedItems.includes(message.id))
        //^^ use this to patch eventually
        //need to find messages that dont have lable you select
        // use ^^^this and assign it conditionally, will be the array of messages to lable
        let doesNotHaveLabel = checkedMessages.filter(item => !(item.labels.includes(e.target.value)))
        let itemIdsToLabel = doesNotHaveLabel.map(item => item.id)
        console.log('the ids that dont have the lable', itemIdsToLabel)
        console.log('does not have lable',doesNotHaveLabel)
        console.log('checked Items lables', checkedMessages)
        //eventulaly direct this to PATCH in app.js with a function(lable, array of messages)
        putThatLabelOn(e.target.value, itemIdsToLabel)
    }
    const unreadMessages = (list) => {
        let unread = list.filter(item => item.read).length
        if (unread !== 0){
            return (
                <p className="pull-right">
                <span className="badge badge">{unread}</span>
                unread messages
                </p>
            )
        } else {
            return (
                <p className="pull-right">
                <span className="badge badge">{unread}</span>
                no unread messages
                </p>
            )
        }
    }

    return (
        <div className="row toolbar">
            <div className="col-md-12">
                    {unreadMessages(messages)}
                    
                <button onClick={checkAll} className="btn btn-default">
                <i className="fa fa-minus-square-o"></i>
                </button>

                <button onClick={markAsRead} className="btn btn-default">
                Mark As Read
                </button>

                <button onClick={markAsUnread} className="btn btn-default">
                Mark As Unread
                </button>

                <select onChange={addLable} className="form-control label-select">
                    <option value={null} defaultValue>Apply label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <select onChange={removeLable} className="form-control label-select">
                    <option value={null}>Remove label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <button className="btn btn-default">
                <i className="fa fa-trash-o"></i>
                </button>
            </div>
        </div>
    )

}

export default ToolBar