import React, { Component } from 'react';
import './App.css';
import Post from './Post.js';
class Board extends Component {
  constructor() {
    super()
    this.state = {
      postList: [],
      newPost: { id: '', user: '', content: '', time: '' },
      index: 0,
    }
    this.handleUserChange=this.handleUserChange.bind(this);
    this.handleContentChange=this.handleContentChange.bind(this);
    this.handleAddPost=this.handleAddPost.bind(this);
    this.handlePostServer=this.handlePostServer.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleAddComment=this.handleAddComment.bind(this);
    this.handleGetServer=this.handleGetServer.bind(this);
    //this.postToServer = this.postToServer.bind(this);
    //this.commentToServer = this.commentToServer.bind(this);
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
    console.log("add post");
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
      //this.setState({ newPost: { id: '', user: '', content: '', time: '' } });
      this.setState({ index: this.state.index + 1 });
    }

  }
  handlePostServer() {
    console.log("postToServer");
    //const data = { id, user, content };
    const data = this.state.newPost;
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
    console.log("post id ",this.state.index);
    this.handlePostServer();
  }
  handleGetServer() {
    fecth('/api/comments',{
      method: 'GET'
    })
    .then((response) => {
      if (!response.ok) throw new Error(resonse.statusText)
      console.log
      return response.json()
    })
  }
  handleAddComment(newComment, id) {
    console.log("id of post",id);
    const com=this.state.postList[id].comments;
    com.push({
      id: newComment.id,
      user: newComment.user,
      content: newComment.content,
    });
  }
  //postToServer() {
  
  //}
  //commentToServer() {
  
  //}
  render() {
    return (
      <div className="Board">
        <div className="Board-header">
          <h2>Board</h2>
        </div>
        <div className="input">
          <h2>User</h2>
          <input
            type="text"
            onChange={this.handleUserChange}
            value={this.state.newPost.user}
          />
          <h2>Content</h2>
          <input
            type="text"
            onChange={this.handleContentChange}
            value={this.state.newPost.content}
          />
          <button onClick={this.handleSubmit}>Post</button>
        </div>
        <ul>
          {this.state.postList.map( post =>
            <div className="postList" key={post.id}>
              <Post
                post={post}  
                handleAddComment={this.handleAddComment}
              />
            </div>,
          )}
        </ul>
      </div>
    );
  }
}

export default Board;
