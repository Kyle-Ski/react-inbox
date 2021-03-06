import React from 'react';

const Message = ({isClicked, getSubject, getBody, submit}) => {
    
    return (
        <div>
        <form className={`form-horizontal well ${isClicked ? '' : 'hidden'}`}>
            <div className="form-group">
                <div className="col-sm-8 col-sm-offset-2">
                <h4>Compose Message</h4>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
                <div className="col-sm-8">
                <input onChange={getSubject} type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject"/>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="body" className="col-sm-2 control-label">Body</label>
                <div className="col-sm-8">
                <textarea onChange={getBody} name="body" id="body" className="form-control"></textarea>
                </div>
            </div>
            <div className="form-group">
                <div className="col-sm-8 col-sm-offset-2">
                <input onClick={submit} type="submit" value="Send" className="btn btn-primary"/>
                </div>
            </div>
        </form>
        </div>
    )
}

export default Message