module.exports = async (req, res) => {
  if (req.method === 'POST') {
    res.status(200).json({ status: 'success' });
  } else {
    res.status(200).json({ message: 'Bot está rodando!' });
  }
};
