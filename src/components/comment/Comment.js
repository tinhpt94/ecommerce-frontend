import React, {Component} from "react";
import Stars from "react-stars";
import "../../../node_modules/react-star-rating/dist/css/react-star-rating.min.css";
import Avatar from "material-ui/Avatar";

export default class Comment extends Component {

  render() {
    const {comment} = this.props;
    return (
      <div className="product-rating">
        <div className="product-rating-avatar">
          <Avatar src={comment.user_img || ""}/>
        </div>
        <div className="product-rating-main">

          <div className="product-rating-rating display-inline-block">
            <span className="display-inline-block">{comment.rated_by_user}</span><Stars className="display-inline-block"
                                                                                        value={comment.rating} size={14}
                                                                                        edit={false}/>
          </div>

          <div className="product-rating-content">
            {comment.content}
          </div>

          <div className="product-rating-time">
            {comment.created_date}
          </div>
        </div>
      </div>
    )
  }
}