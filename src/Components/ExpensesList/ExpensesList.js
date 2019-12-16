import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import axios from 'axios';

class ExpensesList extends Component {

  deleteExpense = id => {
    let confirmDelete = window.confirm('Do you really want to delete this expense?')
    if (confirmDelete) {
      axios.delete(`http://localhost:5000/expenses/${id}`)
        .then(exp => alert('deleted'))
        .catch(err => alert('unable to delete'))
    }
  }

  render() {

    const expenses = this.props.expenses.data
      .map(expense => {
        return (
          <tr key={expense.id}>
            <th scope="row">{expense.id}</th>
            <td> {expense.reason} </td>
            <td> <span>&#163; </span> {expense.value} </td>
            <Button color="danger" onClick={() => this.deleteExpense(expense.id)}>Del</Button>
            <Button disabled style={{ marginLeft: '5px' }} color="primary" onClick={() => this.editExpense(expense.id)}>Edit</Button>
          </tr>
        )
      })

      const totalExpenses = this.props.expenses.data
        .map(exp => {
          return +exp.value
        }).reduce((acc, curr) => acc + curr)
        

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Value</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
         {expenses}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" colSpan="2">Total</th>
            <td><span style={{fontWeight:"bold"}}>&#163; {totalExpenses.toFixed(2)} </span></td>
          </tr>
        </tfoot>
      </Table>
    )
  }


}


export default ExpensesList  