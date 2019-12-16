import React, { Component } from 'react';
import axios from 'axios'

import { Col, Button, Form, FormGroup, Label, Input, Jumbotron } from 'reactstrap';

class Expense extends Component {
  state = {
    totalValue: '',
    reason: '',
    tax: '',
    actualValue: '',
    currency: '',
    date: ''
  }

  handleSubmit = (event) => {
    // event.preventDefault();
    axios.post('http://localhost:5000/expenses', { value: this.state.actualValue, reason: this.state.reason, date: this.state.date })
      .then(newExpense => alert(newExpense.data[0].value + ' is added as expense for the ' + newExpense.data[0].reason))
      .catch(err => alert('Error adding expenses'))
  }

  calculateTaxHandler(amt) {
    let tax = 0.2 * amt
    return tax.toFixed(2)
  }

  calculateActualAmountHandler(amt) {
    let actualAmount = 0.8 * amt
    return actualAmount.toFixed(2)
  }

  handleCurrencyConversion(amt) {
    const conversion = axios.get(process.env.CURRENCY_CONVERTER_API_KEY)
      .then(data => JSON.parse(data))
      .then(rate => Object.values(rate))
    // if(this.state.currency === 'EUR'){
    const EURtoGBP = amt * conversion
    this.setState({
      actualValue: EURtoGBP
    })
    // }
  }


  render() {
    return (
      <Jumbotron>
        <Form onSubmit={this.handleSubmit}>
        <FormGroup row>
            <Label sm={1}>Tax</Label>
            <Col sm={3}>{this.state.tax}</Col>
            <Label sm={1}>Actual Amount</Label>
            <Col sm={3}>{this.state.actualValue}</Col>
          </FormGroup>

          <FormGroup row>
            <Label sm={12}>Date</Label>
            {/* <Col sm={8}></Col> */}
            <Col>
              <Input 
                type="date" 
                required
                value={this.state.date}
                onChange={event => {
                  this.setState({
                    date: event.target.value
                  })
                }} />
            </Col>
          </FormGroup>

          <FormGroup row  >
            <Label style={{ textAlign: "left" }} sm={12} for="expensesValue">Value</Label>
            <Col sm={12}>
              <Input
                type="number"
                name="expensesValue"
                value={this.state.totalValue}
                id="expensesValue"
                placeholder="value of expenses..."
                onChange={event => {
                  this.setState({
                    totalValue: event.target.value,
                    tax: this.calculateTaxHandler(Number(event.target.value)),
                    actualValue: this.calculateActualAmountHandler(Number(event.target.value))
                  })
                }}
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Label style={{ textAlign: "left" }} sm={12} for="currency">Currency</Label>
            <Input
              type="select"
              name="currency"
              id="currency"
              sm={12}
              onChange={event => {
                this.setState({
                  currency: event.target.value
                })
                if (this.state.currency === 'EUR') {
                  alert('Equivalent will be saved in GBP')
                  const convertedValue = this.handleCurrencyConversion(this.state.actualValue)
                  this.setState({ actualValue: convertedValue })
                }
              }}
            >
              <option value="GBP">GBP</option>
              <option value="EUR">EUR</option>
            </Input>
          </FormGroup>

          <FormGroup row>
            <Label for="reason" style={{ textAlign: "left" }} sm={12}>Reason for Expenses</Label>
            <Col sm={12}>
              <Input
                type="textarea"
                value={this.state.reason}
                onChange={event => this.setState({ reason: event.target.value })}
                name="reason"
                id="reason" />
            </Col>
          </FormGroup>

          <FormGroup check row>
            {/* <Col sm={{ size: 10, offset: 2 }}> */}
              <Button color="primary" sm={9}>Save</Button>
            {/* </Col> */}
          </FormGroup>
        </Form>
      </Jumbotron>
    );
  }

}

export default Expense