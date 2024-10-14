import React, { useState } from 'react';
import axios from 'axios';

function AddTransactionForm({ onTransactionsAdded }) {
  const [formData, setFormData] = useState({
    type: '',        
    category: '',    
    amount: '',      
    date: ''         
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');  // Recupera o token do localStorage

      const res = await axios.post('http://localhost:5000/api/finances', formData, {
        headers: {
          'x-auth-token': token  // Envia o token JWT no cabeçalho
        }
      });

      alert('Transaction added successfully');
      setFormData({ type: '', category: '', amount: '', date: '' });  // Limpa o formulário
      if (onTransactionsAdded) {
        onTransactionsAdded();  // Atualiza a lista de transações no Dashboard
      }
    } catch (err) {
      console.error('Error adding transaction:', err);
      alert('Error adding transaction');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <div className="form-group">
        <label htmlFor="type">Transaction Type</label>
        <select
          name="type"
          id="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="">Select type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          id="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Enter category"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          name="amount"
          id="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter amount"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          name="date"
          id="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default AddTransactionForm;


