module.exports = async (req, res) => {
  if (req.method === 'POST') {
    // Responde com sucesso para o LINE (Status 200)
    res.status(200).json({ status: 'success' });
  } else {
    res.status(200).json({ message: 'Bot está rodando!' });
  }
};