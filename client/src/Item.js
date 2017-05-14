import React, { Component } from 'react';

class Item extends Component {
  render() {
    const accounting = this.props.post.accounting;
    return (
      <div>
        <div className="comment">
          <p>{accounting.content}</p>
        </div>
        <div className="replyTime">
          <p>borrow from  {accounting.user}</p>
          <p>{accounting.time}</p>
        </div>
      </div>
    );
  }
}
Item.propTypes = {
  accounting: React.PropTypes.shape({
  }).isRequired,
};

export default Item;
