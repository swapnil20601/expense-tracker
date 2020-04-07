import React, { Component } from "react";
import uuid from "react-uuid";
import ExpenseTable from "../../components/ExpenseTable/ExpenseTable";
import FormField from "../../components/FormField/FormField";
import Aux from "../../hoc/Auxiliary";

//Parent Component that manages state of the application and operations performed on it
class Expenses extends Component {
  state = {
    id: "",
    date: "",
    item: "",
    amount: "",
    location: "",
    paymentType: "",
    expenses: [],
    expenseIndex: 0,
    errorMessages: {
      itemError: "",
      amountError: "",
      locationError: "",
      paymentTypeError: "",
      dateError: "",
    },
  };

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
        paymentTypeError,
      };
      this.setState({ errorMessages: updatedErrorMessages });
      return false;
    }

    return true;
  };

  changeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  deleteExpenseHandler = () => {
    const expenseIndex = this.state.deleteExpenseIndex;
    const updatedExpenses = [...this.state.expenses];
    updatedExpenses.splice(expenseIndex, 1);
    //deletes the expense from local storage
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    this.setState({ expenses: updatedExpenses });
  };

  saveUpdatedExpenseModal = (updatedExpense) => {
    delete updatedExpense.errorMessages;

    const newExpense = [...this.state.expenses];
    const newExpenseIndex = newExpense.findIndex(
      (element) => element.id === updatedExpense.id
    );
    newExpense[newExpenseIndex] = updatedExpense;
    this.setState({ expenses: newExpense });

    //updates the edited expense in local storage
    localStorage.setItem("expenses", JSON.stringify(newExpense));
  };

  submitFormHandler = (event) => {
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

      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

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
          locationError: "",
          dateError: "",
          paymentTypeError: "",
        },
      });
    }
  };

  //React lifecycle method to show the Expenses stored in local storage, if any,
  //once page is reloaded or revisited
  componentDidMount() {
    const localStorageExpenses = JSON.parse(localStorage.getItem("expenses"));

    if (localStorage.getItem("expenses")) {
      this.setState({ expenses: localStorageExpenses });
    } else {
      this.setState({ expenses: [] });
    }
  }

  render() {
    return (
      <Aux>
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
            deleteExpenseHandler={this.deleteExpenseHandler}
            saveExpenseHandler={this.saveUpdatedExpenseModal}
          />
        </main>
      </Aux>
    );
  }
}

export default Expenses;
