const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');  // Captura o token do cabeçalho da requisição

  if (!token) {
    return res.status(401).json({ msg: 'Nenhum token, autorização negada' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verifica o token JWT
    req.user = decoded.userId;  // Preenche req.user com o ID do usuário
    console.log('Token válido. User ID:', req.user); 
    next();  // Passa para o próximo middleware ou rota
  } catch (err) {
    console.error('Token inválido:', err.message);  // Log adicional para depuração
    res.status(401).json({ msg: 'Token inválido' });
  }
};

module.exports = authMiddleware;

