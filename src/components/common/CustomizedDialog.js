import React, { Component } from "react";
import Dialog from "material-ui/Dialog";

class CustomizedDialog extends Component {
  render() {
    const { title, content, actions, open, handleClose } = this.props;
    return (
      <Dialog
        title={title}
        actions={actions}
        modal={false}
        open={open}
        onRequestClose={handleClose}
      >
        {content}
      </Dialog>
    );
  }
}

export default CustomizedDialog;
