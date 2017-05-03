import React, {Component} from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import ProductStore from "../../stores/ProductStore";
import ProductService from "../../services/ProductService";
import RaisedButton from "material-ui/RaisedButton";
import Stars from "react-stars";
import ValidateComment from "./ValidateComment";

export default class CommentForm extends Component {

  constructor(props) {
    super(props);
    this.state = this._getState();
    this._onChange = this._onChange.bind(this);
    this.onSelectStars = this.onSelectStars.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.isValid = this.isValid.bind(this);
    this.ratingChanged = this.ratingChanged.bind(this);
  }

  _getState() {
    return ({
      title: "",
      content: "",
      rating: 5,
      errors: {}
    })
  }

  _onChange() {
    this.setState(this._getState());
  }

  componentWillMount() {
    ProductStore.addChangeListener(this._onChange)
  }

  componentWillUnmount() {
    ProductStore.removeChangeListener(this._onChange)
  }

  onSelectStars(e, data) {
    this.setState({rating: data.rating})
  }

  isValid() {
    const {errors, isValid} = ValidateComment(this.state);
    if (!isValid) {
      this.setState({
        errors: errors
      })
    }
    return isValid;
  }

  onInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      ProductService.addComment({
        title: this.state.title,
        content: this.state.content,
        rating: this.state.rating,
        productId: this.props.product.id
      })
    }
  }

  ratingChanged(newRating) {
    this.setState({
      rating: newRating
    })
  }

  render() {
    return (
      <div className="comment-wrapper">

        <Stars name="disabled"
               totalStars={5}
               value={this.state.rating}
               size={14}
               onChange={this.ratingChanged}
        />

        <TextFieldGroup
          field="title"
          value={this.state.title}
          label="Tiêu đề đánh giá"
          onChange={this.onInputChange}
          error={this.state.errors.title}
        />
        <TextFieldGroup
          field="content"
          value={this.state.content}
          label="Nội dung đánh giá"
          onChange={this.onInputChange}
          error={this.state.errors.content}
        />

        <RaisedButton label="Đánh giá" onTouchTap={this.onSubmit}/>
      </div>
    )
  }
}