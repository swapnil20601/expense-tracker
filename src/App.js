import React from "react";
import "./App.css";
import Expenses from './container/Expenses/Expenses';

const App = () => {
  return (
    <div className="container">
      <h1 className="App m-3 p-5 d-flex justify-content-center">Expense Tracker</h1>
      <Expenses />
    </div>
  );
}

export default App;
