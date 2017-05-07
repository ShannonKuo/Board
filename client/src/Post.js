import React, { Component } from 'react';
import './App.css';
import Comments from './Comments';

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
      newComment: { id: '', user: '', content: '', time: '' },
      index: 0,
    }
    this.handleUserChange=this.handleUserChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleSubmitComment = this.handleSubmitComment.bind(this);
  };
  handleUserChange(e) {
    this.setState({
      newComment: { id: this.state.index,
                    user: e.target.value,
                    content: this.state.newComment.content
                  }
    });
  }

  handleCommentChange(e) {
    this.setState({
      newComment: { id: this.state.index,
                    user: this.state.newComment.user,
                    content: e.target.value
                  }
    });
  }
  handleSubmitComment(id) {
    let data = this.state.newComment;
    data.time = Date();
    this.props.handleSubmitComment(data, id);
    this.setState({ index: this.state.index + 1 })
    this.setState({ newComment: { id: '', user: '', content: '', time: '' } });
  }

  render() {
    const comments = this.props.post.comments;
    this.state.index=this.props.post.comments.length;
    return(
      <div>
        <div className="displayPost">
          <div className="postName">
            <p>{this.props.post.content}</p>
          </div>
          <div className="postTime">
            <p>Posted by  {this.props.post.user}</p>
            <p>{this.props.post.time}</p>
            <hr color="#FFFFFF"></hr>
          </div>
          <div className="inputComment">
            <p>write some comments...</p>
            <p>
              <TextField
                type="text"
                onChange={this.handleUserChange}
                hintText="user name"
                value={this.state.newComment.user}
              />
            </p>
            <p>
              <TextField
                type="text"
                onChange={this.handleCommentChange}
                hintText="comment..."
                value={this.state.newComment.content}
              />
              <FlatButton
                label="send"
                onClick={() => {this.handleSubmitComment(this.props.post.id)}}
              />
            </p>
          </div> 
          <ul className="comments">
            {comments.map(comment =>
              <div className="comment" key={comment.id}>
                <Comments
                  comment={comment}
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

