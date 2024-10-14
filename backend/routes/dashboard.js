const express = require('express');
const Finance = require('../models/Finance');  // Modelo de transações
const authMiddleware = require('../middleware/authMiddleware');  // Corrija o caminho conforme necessário
const router = express.Router();

// Rota protegida para buscar as transações financeiras
router.get('/', authMiddleware, async (req, res) => {
  try {
    console.log('User ID:', req.user);
    const finances = await Finance.find({ userId: req.user });  // Usar req.user (preenchido pelo middleware)
    res.json(finances);
  } catch (error) {
    console.error('Erro ao buscar transações:', error);
    res.status(500).json({ error: 'Erro ao buscar transações' });
  }
});

module.exports = router;

//Code with errors in goals part
// const express = require('express');
// const Finance = require('../models/Finance');  // Modelo de transações
// const Goal = require('../models/Goal');  // Modelo de metas
// const authMiddleware = require('../middleware/authMiddleware');  // Corrija o caminho conforme necessário
// const router = express.Router();


// // Rota protegida para buscar as transações financeiras
// router.get('/dashboard', authMiddleware, async (req, res) => {
//   try {
//     const finances = await Finance.find({ userId: req.user });  // Usar req.user (preenchido pelo middleware)
//     res.json(finances);
//   } catch (error) {
//     console.error('Erro ao buscar transações:', error);
//     res.status(500).json({ error: 'Erro ao buscar transações' });
//   }
// });

// //Rota para obter todas as metas
// router.get('/goals', authMiddleware, async (req, res) => {
//   try {
//     // Usar req.user preenchido pelo middleware
//     const goals = await Goal.find({ userId: req.user });
//     res.json(goals);
//   } catch (err) {
//     console.error('Error fetching goals:', err);
//     res.status(500).json({ error: 'Error fetching goals' });
//   }
// });

// module.exports = router;
