import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import { Container, Row } from 'reactstrap'

import Expense from '../src/Components/Expense/Expense'
import ExpensesList from '../src/Components/ExpensesList/ExpensesList'
import Navigation from './Components/Navbar/Navbar'
// import {Route} from 'react-router-dom'

class App extends Component {
  state = {
    expenses: null,
    date: new Date().toLocaleTimeString(),
    time: new Date().toLocaleDateString()
  }

  //Read from Database
  getExpenses() {
    axios.get('http://localhost:5000/expenses')
      .then(expenses => this.setState({ expenses }))
      .catch(err => console.log(err))
  }


  componentDidMount() {
    this.getExpenses()
  }

  render() {
    return (
      <Container className="App">
        <Navigation now={this.state.date} />

        <Row style={{display:"block"}}>
          <Expense now={this.state.time} />
        </Row>

        <br />

        <Row>
          <h2>List of Expenses</h2>
        </Row>

        <Row>
          {this.state.expenses &&
            <ExpensesList
              expenses={this.state.expenses}
              updateState={this.updateState}
              deleteExpense={this.deleteExpenseFromState}
            />
          }
        </Row>
      </Container>
    );
  }

}

export default App;
