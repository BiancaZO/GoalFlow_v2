const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();  // Carrega variáveis de ambiente

// Inicializa o servidor Express
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const financeRoutes = require('./routes/financeRoutes');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');

// Conexão ao MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));


// Rota básica para teste
app.get('/', (req, res) => {
  res.send('API is running');
});

// Definir rotas
app.use('/api', financeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);  // Monta dashboardRoutes em /api/dashboard

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
