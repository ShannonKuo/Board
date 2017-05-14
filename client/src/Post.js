import React, { Component } from 'react';
import './App.css';
import Item from './Item';

// material ui
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class Post extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
    }
    this.handleAddMoney = this.handleAddMoney.bind(this);
  };

  handleAddMoney(id) {
    this.props.handleAddMoney(id);
  }
  render() {
    const accountings = this.props.post.accounting;
    this.state.index=this.props.post.accounting.length;
    return(
      <div>
        <div className="displayPost">
          <div className="postName">
            <p>{this.props.post.user}</p>
          </div>
          <div className="postTime">
            <p>{this.props.post.time}</p>
            <hr color="#FFFFFF"></hr>
          </div>
          <FlatButton label="press me" onClick={() => {this.handleAddMoney(this.props.post.id); }} />
          <ul className="comments">
            {accountings.map(accounting =>
              <div className="comment" key={accounting.id}>
                <Item
                  post={this.props.post}
                />
              </div>,
            )}
          </ul>
        </div>
      </div>
    ) 
  }

}
export default Post

