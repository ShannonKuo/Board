import React, { Component } from 'react';

class Comments extends Component {
  constructor() {
    super();
  }

  render() {
    const comment = this.props.comment;
    return (
      <div>
        <div className="comment">
          <p>{comment.content}</p>
        </div>
        <div className="replyTime">
          <p>Posted by  {comment.user}</p>
          <p>{comment.time}</p>
        </div>
      </div>
    );
  }
}
Comments.propTypes = {
  comment: React.PropTypes.shape({
  }).isRequired,
};

export default Comments;
