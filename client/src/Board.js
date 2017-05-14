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
      money: '',
      peopleCnt: 0,
      newPost: { id: '', user: '', time: '' },
      index: 0,
    }
    this.handleUserChange=this.handleUserChange.bind(this);
    this.handleContentChange=this.handleContentChange.bind(this);
    this.handleAddPost=this.handleAddPost.bind(this);
    //this.handlePostServer=this.handlePostServer.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleSubmitMoney=this.handleSubmitMoney.bind(this);
    this.handleAddMoney=this.handleAddMoney.bind(this);
    //this.handleCommentServer=this.handleCommentServer.bind(this);
    this.handleSubmitComment=this.handleSubmitComment.bind(this);
    this.handleSetType=this.handleSetType.bind(this);
  }
  handleUserChange(e) {
    if (e.key === 'Enter'){
      this.handleSubmit();
    } else {
      this.setState({
        newPost: { id: this.state.index,
                   user: e.target.value,
                 },
      });
    }
  }
  handleContentChange(e) {
    if (e.key === 'Enter'){
      this.handleSubmit();
    } else {
      this.setState({
        money: e.target.value,
      });
    }
  }

  handleAddPost() { 
    if (this.state.newPost.user !== '' ) {
      const list = this.state.postList;
      list.push({
        id: this.state.newPost.id,
        user: this.state.newPost.user,
        time: Date(),
        accounting: [],
      });
      console.log("add user");
      this.setState({ postList: list });
      this.setState({ index: this.state.index + 1 });
    }

  }
  handleSubmitMoney() {
  }
  handleAddMoney(id) {
    console.log("add money");
    this.setState({ peopleCnt: this.state.peopleCnt + 1 });
    const list = this.state.postList[id];
    const lists = this.state.postList;
    console.log(this.state.money);
    console.log(this.state.peopleCnt + 1);
    list.accounting.push({
      id: id,
      type: '',
      content: this.state.money / (1 + this.state.peopleCnt),
      time: '',
    })
    lists[id] = list;
    this.setState({ postList: lists });
  }
  /*
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
    this.setState({ newPost: { id: '', user: '', time: '' } });
  }*/
  handleSubmit() {
    this.handleAddPost();
    //this.handlePostServer();
  }
  /*
  componentDidMount() {
    fetch('/api/comments')
      .then(res => res.json())
      .then((data) => {
        this.setState({ postList: data })
        this.setState({ index: data.length })
      })
      .catch(err => console.error(err));
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
  }*/
  handleSubmitComment( newComment, id ) {
    this.handleAddComment( newComment, id );
    //this.handleCommentServer( id );
  }
  handleSetType( type ) {
    this.setState({
      newPost: {
        type: type,
      }
    }) 
    console.log(type);
  }
  render() {
    return (
      <div className="Board">
        <div className="boardHeader">
          <div className="title">
            <h2>Accounting Manager</h2>
          </div>
          <div className="input">
            <TextField
              type="text"
              onChange={this.handleUserChange}
              hintText="user name"
              value={this.state.newPost.user}
            />
            <FlatButton label="Add user" onClick={this.handleSubmit}/>
          </div>
          <div>
            <p>After entering the money, please press the button of the user to add the money~~</p>
            <p>I
              <FlatButton label="borrow" onClick={() => {this.handleSetType('borrow');}}/>
              <FlatButton label="lend" onClick={() => {this.handleSetType('lend');}}/>
              <TextField
                type="text"
                onChange={this.handleContentChange}
                hintText="input the $$$"
                value={this.state.money}
              />
              from
            </p>
            <FlatButton label="Done" onClick={this.handleSubmitMoney}/>
          </div>
        </div>

        <div className="container">
          <ul>
            {this.state.postList.map( post =>
              <div className="postList" key={post.id}>
                <Post
                  post={post}  
                  money={this.state.money}
                  handleSubmitComment={this.handleSubmitComment}
                  handleAddMoney={this.handleAddMoney}
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
