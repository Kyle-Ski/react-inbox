import React from 'react';

const ToolBar = ({markAsRead, markAsUnread, checkAll, addLable, removeLable}) => {
    return (
        <div className="row toolbar">
            <div className="col-md-12">
                <p className="pull-right">
                    <span className="badge badge">2</span>
                    unread messages
                </p>

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
                    <option>Apply label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <select onChange={removeLable} className="form-control label-select">
                    <option>Remove label</option>
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