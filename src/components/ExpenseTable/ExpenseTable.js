import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import PropTypes from "prop-types";
import React from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import classes from "./ExpenseTable.module.css";

const expenseTable = props => {
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
    <React.Fragment>
      <Table className={classes.Border}>
        {showHeader}
        <Tbody>
          {props.body.map((expense, index) => {
            return (
              <Tr key={expense.id}>
                <Td>{index + 1})</Td>
                <Td>{expense.date}</Td>
                <Td>{expense.item}</Td>
                <Td>{expense.amount}$</Td>
                <Td>{expense.paymentType}</Td>
                <Td>{expense.location}</Td>
                <Td>
                  <EditIcon
                    className="d-md-table mx-auto"
                    onClick={props.edit.bind(this, expense, index)}
                  />
                </Td>
                <Td>
                  <DeleteIcon
                    color="secondary"
                    className="d-md-table mx-auto"
                    onClick={props.deleteExpense.bind(this, index)}
                  />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </React.Fragment>
  );
};

expenseTable.propTypes = {
  body: PropTypes.arrayOf(Object).isRequired
};

export default expenseTable;
