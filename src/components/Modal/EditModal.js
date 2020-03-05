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
    paymentType: "",
    errorMessages: {
      itemError: "",
      amountError: "",
      locationError: "",
      paymentTypeError: "",
      dateError: ""
    }
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      id: nextProps.populateModalData.id,
      amount: nextProps.populateModalData.amount,
      item: nextProps.populateModalData.item,
      location: nextProps.populateModalData.location,
      paymentType: nextProps.populateModalData.paymentType,
      date: nextProps.populateModalData.date
    });
  }

  validate = () => {
    let itemError = "";
    let locationError = "";
    let amountError = "";
    let dateError = "";
    let paymentTypeError = "";
    let amountRegex = /^(0|[1-9]\d*)(\.\d+)?$/;
    let dateRegex = /^\d{4}-\d{1,2}-\d{1,2}$/;

    if (this.state.item.trim() === "") {
      itemError = "Item is required";
    } else if (this.state.item.length > 10) {
      itemError = "Maximum characters allowed are 10";
    }

    if (this.state.location.trim() === "") {
      locationError = "Location is required";
    }

    if (this.state.amount.trim() === "") {
      amountError = "Amount is required";
    } else if (!amountRegex.test(this.state.amount)) {
      amountError = "Please enter valid numeric or decimal value";
    }

    if (this.state.date.trim() === "") {
      dateError = "Valid date is required";
    } else if (!dateRegex.test(this.state.date)) {
      dateError = "Please enter valid date in MM/DD/YYYY format";
    }

    if (this.state.paymentType.trim() === "") {
      paymentTypeError = "Payment Mode is required";
    }

    if (
      itemError ||
      locationError ||
      amountError ||
      dateError ||
      paymentTypeError
    ) {
      const updatedErrorMessages = {
        ...this.state.errorMessages,
        itemError,
        locationError,
        amountError,
        dateError,
        paymentTypeError
      };
      this.setState({ errorMessages: updatedErrorMessages });
      return false;
    }

    return true;
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value, id: uuid() });
  };

  saveNewExpenseHandler = () => {
    const isValid = this.validate();

    if (isValid) {
      this.props.saveEditedExpense(this.state);
      this.setState({
        id: "",
        date: "",
        item: "",
        amount: "",
        location: "",
        paymentType: "",
        errorMessages: {
          itemError: "",
          amountError: "",
          locationError: "",
          dateError: "",
          paymentTypeError: ""
        }
      });
    }
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
          <div className="form-group">
            <label className="col-sm-3">
              <strong>Amount:</strong>
            </label>
            <input
              className={
                this.state.errorMessages.amountError === ""
                  ? classes.InputType
                  : classes.ErrorInput
              }
              name="amount"
              type="text"
              value={this.state.amount}
              onChange={this.changeHandler}
            />
            <div className={classes.ErrorMessage}>
              {this.state.errorMessages.amountError}
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-3">
              <strong>Date:</strong>
            </label>
            <input
              className={
                this.state.errorMessages.dateError === ""
                  ? classes.InputType
                  : classes.ErrorInput
              }
              name="date"
              type="date"
              value={this.state.date}
              onChange={this.changeHandler}
            />
            <div className={classes.ErrorMessage}>
              {this.state.errorMessages.dateError}
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-3">
              <strong>Item:</strong>
            </label>
            <input
              className={
                this.state.errorMessages.itemError === ""
                  ? classes.InputType
                  : classes.ErrorInput
              }
              name="item"
              type="text"
              value={this.state.item}
              onChange={this.changeHandler}
            />
            <div className={classes.ErrorMessage}>
              {this.state.errorMessages.itemError}
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-3">
              <strong>Location:</strong>
            </label>
            <input
              className={
                this.state.errorMessages.locationError === ""
                  ? classes.InputType
                  : classes.ErrorInput
              }
              name="location"
              type="text"
              value={this.state.location}
              onChange={this.changeHandler}
            />
            <div className={classes.ErrorMessage}>
              {this.state.errorMessages.locationError}
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-3">
              <strong>Payment Type:</strong>
            </label>
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
          </div>
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
