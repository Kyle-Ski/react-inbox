import React, {Component} from 'react';

class SingleMessage extends Component {

    state={
        expandMessage: false
    }

    render(){
        return(
            <div>
            <div id={this.props.id} className={`row clickable-row message ${this.props.isRead} ${this.props.checkedStyle}`}>
                <div className="col-xs-1">
                    <div className="row">
                        <div className="col-xs-2">
                            <input className="checkbox" type="checkbox" checked={this.props.selected(this.props.id)} onChange={this.props.handleCheck} value={this.props.message.id}/>
                        </div>
                        <div className="col-xs-2">
                            <i id={this.props.message.id} onClick={this.props.message.starred ? this.props.markAsUnstared : this.props.markAsStared} className={`star fa fa-star${this.props.isStared}`}></i>
                        </div>
                    </div>
                </div>
                <div id={this.props.id} className="col-xs-11">
                <span className="label label-warning">{this.props.message.labels[0]}</span>
                <span className="label label-warning">{this.props.message.labels[1]}</span>
                <span className="label label-warning">{this.props.message.labels[2]}</span>
                    <a id={this.props.id} onClick={()=> this.setState({expandMessage: !this.state.expandMessage})}>
                        {this.props.message.subject}
                    </a>
                </div>
            </div> 
            <div className={`row message-body ${this.state.expandMessage ? '' : 'hidden'}`}>
                <div className="col-xs-11 col-xs-offset-1">
                    {this.props.message.body}
                </div>
            </div>
            </div>

        )
    }
}

export default SingleMessage