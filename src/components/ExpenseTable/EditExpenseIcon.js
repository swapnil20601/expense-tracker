import EditIcon from "@material-ui/icons/Edit";
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import classes from "./Modal.module.css";

class EditExpenseIcon extends Component {
  state = {
    ...this.props,
    showModal: false,
    errorMessages: {
      itemError: "",
      amountError: "",
      locationError: "",
      paymentTypeError: "",
      dateError: "",
    }
  };

  showModal = () => {
    this.setState({ showModal: true });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  saveExpense = () => {
    this.props.saveExpenseHandler(this.state.expense);
    this.hideModal();
  };

  changeHandler = (event) => {
    const newExpenseModalData = { ...this.state.expense };
    newExpenseModalData[event.target.name] = event.target.value;
    this.setState({ expense: newExpenseModalData });
  };

  render() {
    const { expense } = this.state;

    return (
      <>
        <EditIcon className="d-md-table mx-auto" onClick={this.showModal} />

        <Modal
          show={this.state.showModal}
          onHide={this.hideModal}
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
                defaultValue={expense.amount}
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
                defaultValue={expense.date}
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
                defaultValue={expense.item}
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
                defaultValue={expense.location}
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
                defaultValue={expense.paymentType}
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
            <Button variant="dark" onClick={this.hideModal}>
              Close
            </Button>
            <Button variant="primary" onClick={this.saveExpense}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default EditExpenseIcon;
