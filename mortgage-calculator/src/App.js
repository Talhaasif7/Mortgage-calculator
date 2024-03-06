import React, { useState } from 'react';
import './App.css';

function App() {
  const [mortgagePayment, setMortgagePayment] = useState('');
  const [totalPayment, setTotalPayment] = useState('');
  const [interestPaid, setInterestPaid] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const loanAmount = parseFloat(data.get('loan-amount'));
    const monthlyInterestRate = parseFloat(data.get('interest-rate')) / 100 / 12;
    const loanTermInMonths = parseFloat(data.get('loan-term')) * 12;

    const monthlyPaymentAmount =
      (loanAmount * monthlyInterestRate) /
      (1 - 1 / Math.pow(1 + monthlyInterestRate, loanTermInMonths));
    const totalPayment = monthlyPaymentAmount * loanTermInMonths;

    const currencyFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    setMortgagePayment(currencyFormatter.format(monthlyPaymentAmount));
    setTotalPayment(currencyFormatter.format(totalPayment));
    setInterestPaid(currencyFormatter.format(totalPayment - loanAmount));
  };

  return (
    <div className="container">
      <h1>Mortgage Calculator</h1>
      <form onSubmit={onSubmit} className="form">
        <div className="form-group">
          <label htmlFor="loan-amount">Loan Amount:</label>
          <input
            type="number"
            id="loan-amount"
            name="loan-amount"
            defaultValue="0"
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="loan-term">Loan term (years):</label>
          <input
            type="number"
            id="loan-term"
            name="loan-term"
            defaultValue="0"
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="interest-rate">Interest rate (%):</label>
          <input
            type="number"
            id="interest-rate"
            name="interest-rate"
            defaultValue="0"
            step="0.01"
            min="0.01"
            required
          />
        </div>

        <button type="submit">Calculate</button>
      </form>

      <hr />

      <div className="result">
        <div>
          <label>Monthly mortgage payment:</label>
          <strong>{mortgagePayment}</strong>
        </div>

        <div>
          <label>Total payment amount:</label>
          <strong>{totalPayment}</strong>
        </div>

        <div>
          <label>Total interest paid:</label>
          <strong>{interestPaid}</strong>
        </div>
      </div>
    </div>
  );
}

export default App;
