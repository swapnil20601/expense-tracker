import React, { useRef, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import classes from "./Form.module.css";
import PropTypes from "prop-types";

const FormField = props => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  let defVal = "DEFAULT";
  if (props.paymentType !== "") {
    defVal = props.paymentType;
  }

  return (
    <Form onSubmit={props.submit}>
      <Form.Row>
        <Form.Group as={Col} md="3">
          <Form.Label>
            <strong>Amount:</strong>
          </Form.Label>
          <Form.Control
            className={classes.InputType}
            type="text"
            placeholder="How much $ did you spend?"
            name="amount"
            size="sm"
            value={props.amount}
            onChange={props.changed}
            ref={inputRef}
          />
        </Form.Group>

        <Form.Group as={Col} md="3">
          <Form.Label>
            <strong>Date:</strong>
          </Form.Label>
          <Form.Control
            className={classes.InputType}
            type="date"
            name="date"
            size="sm"
            value={props.date}
            onChange={props.changed}
          />
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label>
            <strong>Item:</strong>
          </Form.Label>
          <Form.Control
            className={classes.InputType}
            type="text"
            name="item"
            placeholder="What did you spend on?"
            size="sm"
            onChange={props.changed}
            value={props.item}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} md="6">
          <Form.Label>
            <strong>Location:</strong>
          </Form.Label>
          <Form.Control
            className={classes.InputType}
            type="text"
            name="location"
            placeholder="Where did you purchase?"
            size="sm"
            value={props.location}
            onChange={props.changed}
          />
        </Form.Group>

        <Form.Group as={Col} md="3">
          <Form.Label>
            <strong>Payment Type:</strong>
          </Form.Label>
          <Form.Control
            className={classes.InputType}
            as="select"
            value={defVal}
            size="sm"
            onChange={props.changed}
            name="paymentType"
          >
            <option value="DEFAULT" disabled>
              Select mode of Payment
            </option>
            <option value="Cash">Cash</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Other">Other</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>

      <Form.Group as={Row}>
        <Col sm={{ span: 4, offset: 4 }}>
          <Button
            className="btn btn-primary d-flex justify-content-center d-md-table mx-auto mt-4"
            type="submit"
            size="lg"
          >
            Add Expense
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

FormField.propTypes = {
  amount: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired,
  paymentType: PropTypes.string.isRequired
};

export default FormField;
