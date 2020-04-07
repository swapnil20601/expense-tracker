import PropTypes from "prop-types";
import React from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import DeleteExpenseIcon from "./DeleteExpenseIcon";
import EditExpenseIcon from "./EditExpenseIcon";
import classes from "./ExpenseTable.module.css";

//Functional Component to return dynamic Expense table
const expenseTable = (props) => {
  //Function to convert date format from yyyy-mm-dd to mm/dd/yyyy
  const dateConverter = (date) => {
    const dateObj = new Date(date + "T00:00:00");
    return new Intl.DateTimeFormat("en-US").format(dateObj);
  };

  let showHeader = null;
  if (props.body.length > 0) {
    showHeader = (
      <Thead>
        <Tr>
          <Th>Expense #</Th>
          <Th>Date</Th>
          <Th>Item</Th>
          <Th>Amount</Th>
          <Th>Payment Mode</Th>
          <Th>Location</Th>
          <Th>Update</Th>
          <Th>Delete</Th>
        </Tr>
      </Thead>
    );
  }

  return (
    <>
      <Table className={classes.Border}>
        {showHeader}
        <Tbody>
          {props.body.map((expense, index) => {
            return (
              <Tr key={expense.id}>
                <Td>{index + 1})</Td>
                <Td>{dateConverter(expense.date)}</Td>
                <Td>{expense.item}</Td>
                <Td>{expense.amount}$</Td>
                <Td>{expense.paymentType}</Td>
                <Td>{expense.location}</Td>
                <Td>
                  <EditExpenseIcon
                    expense={expense}
                    saveExpenseHandler={props.saveExpenseHandler}
                  />
                </Td>
                <Td>
                  <DeleteExpenseIcon
                    expense={expense}
                    deleteExpenseHandler={props.deleteExpenseHandler}
                  />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
};

expenseTable.propTypes = {
  body: PropTypes.arrayOf(Object).isRequired,
};

export default expenseTable;
