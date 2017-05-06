import React, { Component } from 'react';
// material ui
//import Checkbox from 'material-ui/Checkbox';
//import IconButton from 'material-ui/IconButton';

class Comments extends Component {
  constructor() {
    super();
    this.state = { };
  }

  render() {
    const comment = this.props.comment;
    return (
      <div className="comment">
        <li>{comment.user}</li>
        <li>{comment.content}</li>
      </div>
    );
  }
}
Comments.propTypes = {
  comment: React.PropTypes.shape({
  }).isRequired,
};

export default Comments;
