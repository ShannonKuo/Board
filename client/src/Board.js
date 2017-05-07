import React, { Component } from 'react';
import './App.css';
import Post from './Post.js';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

// material ui
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class Board extends Component {
  constructor() {
    super()
    this.state = {
      postList: [],
      newPost: { id: '', user: '', content: '', comments: [], time: '' },
      index: 0,
    }
    this.handleUserChange=this.handleUserChange.bind(this);
    this.handleContentChange=this.handleContentChange.bind(this);
    this.handleAddPost=this.handleAddPost.bind(this);
    this.handlePostServer=this.handlePostServer.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleAddComment=this.handleAddComment.bind(this);
    this.handleCommentServer=this.handleCommentServer.bind(this);
    this.handleSubmitComment=this.handleSubmitComment.bind(this);
  }
  handleUserChange(e) {
    if (e.key === 'Enter'){
      this.handleSubmit();
    } else {
      this.setState({
        newPost: { id: this.state.index,
                   user: e.target.value,
                   content: this.state.newPost.content
                 },
      });
    }
  }
  handleContentChange(e) {
    if (e.key === 'Enter'){
      this.handleSubmit();
    } else {
      this.setState({
        newPost: { id: this.state.index,
                   user: this.state.newPost.user,
                   content: e.target.value
                 },
      });
    }
  }

  handleAddPost() { 
    if (this.state.newPost.user !== '' && 
        this.state.newPost.content !== '') {
      const list = this.state.postList;
      list.push({
        id: this.state.newPost.id,
        user: this.state.newPost.user,
        content: this.state.newPost.content,
        time: Date(),
        comments: [],
      });

      this.setState({ postList: list });
      this.setState({ index: this.state.index + 1 });
    }

  }
  handlePostServer() {
    const data = this.state.newPost;
    data.time = Date();
    
    fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( data ),
    })
    .then(res => res.json() )
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText)
      return response.json()
    })
    this.setState({ newPost: { id: '', user: '', content: '', time: '' } });
  }
  handleSubmit() {
    this.handleAddPost();
    this.handlePostServer();
  }
  componentDidMount() {
    fetch('/api/comments')
      .then(res => res.json())
      .then((data) => {
        this.setState({ postList: data })
        this.setState({ index: data.length })
      })
      .catch(err => console.error(err));
  }
  handleAddComment(newComment, id) {
    const com=this.state.postList[id].comments;
    com.push({
      id: newComment.id,
      user: newComment.user,
      content: newComment.content,
      time: newComment.time,
    });
  }
  handleCommentServer(id) {
    const data = this.state.postList[id];
    fetch('/api/reply', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( data ),
    })
    .then(res => res.json() )
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText)
      return response.json()
    })
  }
  handleSubmitComment( newComment, id ) {
    this.handleAddComment( newComment, id );
    this.handleCommentServer( id );
  }
  render() {
    return (
      <div className="Board">
        <div className="boardHeader">
          <div className="title">
            <h2>Board</h2>
          </div>
          <div className="input">
            <TextField
              type="text"
              onChange={this.handleUserChange}
              hintText="user name"
              value={this.state.newPost.user}
            />
            <TextField
              type="text"
              onChange={this.handleContentChange}
              hintText="write something on your post"
              value={this.state.newPost.content}
            />
          </div>
          <FlatButton label="Post" onClick={this.handleSubmit}/>
        </div>

        <div className="container">
          <ul>
            {this.state.postList.map( post =>
              <div className="postList" key={post.id}>
                <Post
                  post={post}  
                  handleSubmitComment={this.handleSubmitComment}
                />
              </div>,
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default Board;
