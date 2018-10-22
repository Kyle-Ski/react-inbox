import React from 'react';

const ToolBar = ({deleteThis, changeClick, messages, markAsRead, markAsUnread, checkAll, checkedItems, putThatLabelOn, takeThatLabelOff, isClicked, checkAllButton}) => {

    const toDelete = (e) => {
        if (e.target.value !== 'Apply label'){
        e.preventDefault()
        let checkedMessages = messages.filter(message => checkedItems.includes(message.id))
        let itemIdsToDelete = checkedMessages.map(item => item.id)
        deleteThis(itemIdsToDelete)
        }
    }

    const addLable = (e) => {
        if (e.target.value !== 'Apply label'){
        e.preventDefault()
        let checkedMessages = messages.filter(message => checkedItems.includes(message.id))
        let doesNotHaveLabel = checkedMessages.filter(item => !(item.labels.includes(e.target.value)))
        let itemIdsToLabel = doesNotHaveLabel.map(item => item.id)
        putThatLabelOn(e.target.value, itemIdsToLabel)
        }
    }
    const removeLable = (e) => {
        e.preventDefault()
        let checkedMessages = messages.filter(message => checkedItems.includes(message.id))
        let doesNotHaveLabel = checkedMessages.filter(item => (item.labels.includes(e.target.value)))
        let itemIdsToLabel = doesNotHaveLabel.map(item => item.id)
        takeThatLabelOff(e.target.value, itemIdsToLabel)
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
                    <a onClick={changeClick} className="btn btn-danger">
                        <i className={`fa ${isClicked ?'fa-minus' : 'fa-plus'}`}></i>
                    </a>
                <button onClick={checkAll} className="btn btn-default">
                <i className={`fa fa-minus-square${checkAllButton ? '' : '-o'}`}></i>
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

                <button onClick={toDelete} className="btn btn-default">
                <i className="fa fa-trash-o"></i>
                </button>
            </div>
        </div>
    )

}

export default ToolBar