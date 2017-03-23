import React, {Component} from "react";
import {Modal} from "react-bootstrap";

class ModalConfirm extends Component {
  render() {
    const {title, content} = this.props;
    return (
      <Modal>
        <Modal.Header>
          <Modal.Title>
            {title}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {content}
        </Modal.Body>

        <Modal.Footer>

        </Modal.Footer>
      </Modal>
    )
  }
}