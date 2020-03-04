import React, { Component } from "react";
import uuid from "react-uuid";
import ExpenseTable from "../../components/ExpenseTable/ExpenseTable";
import FormField from "../../components/FormField/FormField";
import ConfirmationModal from "../../components/Modal/ConfirmationModel";
import EditModal from "../../components/Modal/EditModal";
import Aux from "../../hoc/Auxiliary";

class Expenses extends Component {
  state = {
    id: "",
    date: "",
    item: "",
    amount: "",
    location: "",
    paymentType: "",
    expenses: [],
    showModal: false,
    showConfirmationModal: false,
    editExpenseIndex: 0,
    deleteExpenseIndex: 0,
    editExpenseItem: {},
    errorMessages: {
      itemError: "",
      amountError: "",
      locationError: ""
    }
  };

  validate = () => {
    let itemError, locationError, amountError = "";
    let regex = /^(0|[1-9]\d*)(\.\d+)?$/;

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
    } else if(!regex.test(this.state.amount)) {
      amountError = "Please enter valid numeric or decimal value";
    }

    if (itemError || locationError || amountError) {
      const updatedErrorMessages = {
        ...this.state.errorMessages,
        itemError, locationError, amountError
      };
      this.setState({ errorMessages: updatedErrorMessages });
      return false;
    }

    return true;
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  deleteExpenseHandler = () => {
    const expenseIndex = this.state.deleteExpenseIndex;
    const updatedExpenses = [...this.state.expenses];
    updatedExpenses.splice(expenseIndex, 1);
    this.setState({ expenses: updatedExpenses });
    this.hideConfirmationModalHandler();
  };

  showModalHandler = (requiredExpenseItem, requiredExpenseIndex) => {
    this.setState({
      showModal: true,
      editExpenseItem: requiredExpenseItem,
      editExpenseIndex: requiredExpenseIndex
    });
  };

  showConfirmationHandler = expenseIndex => {
    this.setState({
      showConfirmationModal: true,
      deleteExpenseIndex: expenseIndex
    });
  };

  hideModalHandler = () => {
    this.setState({ showModal: false });
  };

  hideConfirmationModalHandler = () => {
    this.setState({ showConfirmationModal: false });
  };

  saveUpdatedExpenseModal = updatedExpense => {
    const expenseIndex = this.state.editExpenseIndex;
    const editedExpense = [...this.state.expenses];
    editedExpense[expenseIndex] = updatedExpense;
    this.setState({ expenses: editedExpense });
    this.hideModalHandler();
  };

  submitFormHandler = event => {
    event.preventDefault();

    const isValid = this.validate();

    if (isValid) {
      const updatedExpenses = [...this.state.expenses];

      updatedExpenses.push({
        id: uuid(),
        date: this.state.date,
        item: this.state.item,
        amount: this.state.amount,
        location: this.state.location,
        paymentType: this.state.paymentType,
      });

      this.setState({
        expenses: updatedExpenses,
        id: "",
        date: "",
        item: "",
        amount: "",
        location: "",
        paymentType: "",
        errorMessages: {
          itemError: "",
          amountError: "",
          locationError: ""
        }
      });
    }
  };

  render() {
    return (
      <Aux>
        <EditModal
          showModal={this.state.showModal}
          hideModal={this.hideModalHandler}
          saveEditedExpense={this.saveUpdatedExpenseModal}
          populateModalData={this.state.editExpenseItem}
        />
        <ConfirmationModal
          showConfirmationModal={this.state.showConfirmationModal}
          hideConfirmationModal={this.hideConfirmationModalHandler}
          deleteExpense={this.deleteExpenseHandler}
        />
        <FormField
          date={this.state.date}
          item={this.state.item}
          amount={this.state.amount}
          location={this.state.location}
          paymentType={this.state.paymentType}
          submit={this.submitFormHandler}
          changed={this.changeHandler}
          errors={this.state.errorMessages}
        />
        <main className="mt-5 mb-5 d-flex justify-content-center">
          <ExpenseTable
            body={this.state.expenses}
            edit={this.showModalHandler}
            confirmation={this.showConfirmationHandler}
          />
        </main>
      </Aux>
    );
  }
}

export default Expenses;
