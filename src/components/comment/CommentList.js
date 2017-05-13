import React, { Component } from "react";
import Comment from "./Comment";

export default class CommentList extends Component {
  render() {
    const { comments } = this.props;

    return (
      <div className="product-comment-list">
        {comments.map((comment, index) => {
          return <Comment comment={comment} key={index} />;
        })}
      </div>
    );
  }
}
