import React, { Component } from "react";
import uuid from "react-uuid";
import ExpenseTable from "../../components/ExpenseTable/ExpenseTable";
import FormField from "../../components/FormField/FormField";
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
    editExpenseIndex: 0,
    editExpenseItem: {}
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  deleteExpenseHandler = expenseIndex => {
    const updatedExpenses = [...this.state.expenses];
    updatedExpenses.splice(expenseIndex, 1);
    this.setState({ expenses: updatedExpenses });
  };

  showModalHandler = (requiredExpenseItem, requiredExpenseIndex) => {
    this.setState({
      showModal: true,
      editExpenseItem: requiredExpenseItem,
      editExpenseIndex: requiredExpenseIndex
    });
  };

  hideModalHandler = () => {
    this.setState({ showModal: false });
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

    const updatedExpenses = [...this.state.expenses];

    updatedExpenses.push({
      id: uuid(),
      date: this.state.date,
      item: this.state.item,
      amount: this.state.amount,
      location: this.state.location,
      paymentType: this.state.paymentType
    });

    this.setState({
      expenses: updatedExpenses,
      id: "",
      date: "",
      item: "",
      amount: "",
      location: "",
      paymentType: ""
    });
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
        <FormField
          date={this.state.date}
          item={this.state.item}
          amount={this.state.amount}
          location={this.state.location}
          paymentType={this.state.paymentType}
          submit={this.submitFormHandler}
          changed={this.changeHandler}
        />
        <main className="mt-5 mb-5 d-flex justify-content-center">
          <ExpenseTable
            body={this.state.expenses}
            deleteExpense={this.deleteExpenseHandler}
            edit={this.showModalHandler}
          />
        </main>
      </Aux>
    );
  }
}

export default Expenses;
