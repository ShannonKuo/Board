import React, { Component } from 'react';
import './App.css';
import Comments from './Comments';
// material ui
//import FloatingActionButton from 'material-ui/FloatingActionButton';
//import ContentAdd from 'material-ui/svg-icons/content/add';
//import IconButton from 'material-ui/IconButton';
//import TextField from 'material-ui/TextField';

class Post extends Component {
  constructor() {
    super();
    this.state = {
      newComment: { id: '', user: '', content: '' },
      index: 0,
    }
    this.handleUserChange=this.handleUserChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleAddComment = this.handleAddComment.bind(this);
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
  handleAddComment(id) {
    console.log(id);
    this.props.handleAddComment(this.state.newComment, id);
    this.setState({ index: this.state.index + 1 })
    this.setState({ newComment: { id: '', user: '', content: '' } });
  }
  handlePressEnter() {
  
  }

  render() {
    const comments = this.props.post.comments;
    return(
      <div>
        <div className="displayPost">
          <li>{this.props.post.user}</li>
          <li>{this.props.post.content}</li>
          <li>{this.props.post.time}</li>
        </div> 
        <div className="inputComment">
          <h2>User</h2>
          <input
            type="text"
            onChange={this.handleUserChange}
            value={this.state.newComment.user}
          />
          <h2>Reply</h2>
          <input
            type="text"
            onChange={this.handleCommentChange}
            value={this.state.newComment.content}
          />
          <button
            onClick={() => {this.handleAddComment(this.props.post.id)}}
          >Comment
          </button>
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
    ) 
  }

}
export default Post

