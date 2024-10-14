const mongoose = require('mongoose');

const FinanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Referencia o modelo User
    required: true
  },
  type: {
    type: String,
    enum: ['income', 'expense'],  // Define os tipos de transações
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Finance', FinanceSchema);
