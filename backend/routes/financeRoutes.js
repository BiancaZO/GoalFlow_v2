const express = require('express');
const Finance = require('../models/Finance');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Rota para criar uma transação financeira
router.post('/finances', authMiddleware, async (req, res) => {
  const { type, category, amount, date } = req.body;

  try {
    const newFinance = new Finance({
      userId: req.user,
      type,
      category,
      amount,
      date
    });

    await newFinance.save();
    res.status(201).json(newFinance);
  } catch (err) {
    console.error('Erro ao adicionar transação:', err);
    res.status(500).json({ error: 'Erro ao adicionar transação' });
  }
});
// router.post('/finance', async (req, res) => {
//   const { type, category, amount, date } = req.body;

//   try {
//     const finance = new Finance({
//       type,
//       category,
//       amount,
//       date,
//     });
//     await finance.save();
//     res.status(201).json(finance);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to add finance record' });
//   }
// });

// Rota para listar transações financeiras
router.get('/finances', authMiddleware, async (req, res) => {
  try {
    const finances = await Finance.find({ userId: req.user });  // Filtra as transações pelo ID do usuário
    res.json(finances);
  } catch (error) {
    console.error('Erro ao buscar transações financeiras:', error);
    res.status(500).json({ error: 'Erro ao buscar transações financeiras!' });
  }
});
module.exports = router;
