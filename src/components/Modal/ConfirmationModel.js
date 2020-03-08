import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import classes from "./EditModal.module.css";

//Functional Component to show Modal when clicked on Edit button and lets you update expense
const confirmationModel = props => {
  return (
    <Modal
      show={props.showConfirmationModal}
      onHide={props.hideConfirmationModal}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className={classes.TitleFont}>Confirm Delete</Modal.Title>
      </Modal.Header>

      <Modal.Body className={classes.BodyFont}>
        <p>Are you sure you want to delete this expense?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.hideConfirmationModal}>
          Cancel
        </Button>
        <Button variant="danger" onClick={props.deleteExpense}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default confirmationModel;
