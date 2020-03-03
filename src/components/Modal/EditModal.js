import React, { Component } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import uuid from "react-uuid";
import classes from "./EditModal.module.css";

class EditModal extends Component {
  state = {
    id: "",
    date: "",
    item: "",
    amount: "",
    location: "",
    paymentType: ""
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      id: nextProps.populateModalData.id,
      amount: nextProps.populateModalData.amount,
      item: nextProps.populateModalData.item
    });
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value, id: uuid() });
  };

  saveNewExpenseHandler = () => {
    this.props.saveEditedExpense(this.state);
  };

  render() {
    return (
      <Modal
        show={this.props.showModal}
        onHide={this.props.hideModal}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title className={classes.TitleFont}>
            Update Expense
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <p>
              <span className="form-group col-md-4">
                <strong>Amount:</strong>
              </span>
              <input
                className={classes.InputType}
                name="amount"
                type="text"
                value={this.state.amount}
                onChange={this.changeHandler}
              />
            </p>
            <p>
              <span className="form-group col-md-4">
                <strong>Date:</strong>
              </span>
              <input
                className={classes.InputType}
                name="date"
                type="date"
                value={this.state.date}
                onChange={this.changeHandler}
              />
            </p>
            <p>
              <span className="form-group col-md-4 ">
                <strong>Item:</strong>
              </span>
              <input
                className={classes.InputType}
                type="text"
                name="item"
                value={this.state.item}
                onChange={this.changeHandler}
              />
            </p>
            <p>
              <span className="form-group col-md-4 ">
                <strong>Location:</strong>
              </span>
              <input
                className={classes.InputType}
                type="text"
                name="location"
                value={this.state.location}
                onChange={this.changeHandler}
              />
            </p>
            <p>
              <span className="form-group col-md-4">
                <strong>Payment Type:</strong>
              </span>
              <select
                className={classes.InputType}
                name="paymentType"
                value={this.state.paymentType}
                onChange={this.changeHandler}
              >
                <option value="Cash">Cash</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Other">Other</option>
              </select>
            </p>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={this.props.hideModal}>
            Close
          </Button>
          <Button variant="primary" onClick={this.saveNewExpenseHandler}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default EditModal;
