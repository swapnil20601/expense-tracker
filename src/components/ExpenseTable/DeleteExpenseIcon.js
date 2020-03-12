import React, { Component } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import classes from "./Modal.module.css";

class DeleteExpenseIcon extends Component {
  state = {
    ...this.props,
    showModal: false
  };

  showModal = () => {
    this.setState({ showModal: true });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <>
        <DeleteIcon
          color="secondary"
          className="d-md-table mx-auto"
          onClick={this.showModal}
        />

        <Modal
          show={this.state.showModal}
          onHide={this.hideModal}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title className={classes.TitleFont}>
              Confirm Delete
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className={classes.BodyFont}>
            <p>Are you sure you want to delete this expense?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={this.props.deleteExpenseHandler}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default DeleteExpenseIcon;
