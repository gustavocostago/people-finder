import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { config } from './config.js';


const app = express();
const PORT = config.port;

app.use(cors(config.cors));

app.use(express.json());


const makeApiRequest = async (method, endpoint, data = null, headers = {}) => {
  try {
    const requestConfig = {
      method,
      url: `${config.apiBaseUrl}${endpoint}`,
      timeout: config.apiTimeout,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    if (data) {
      requestConfig.data = data;
    }

    const response = await axios(requestConfig);
    return response.data;
  } catch (error) {
    console.error('Erro na requisição para API:', error.message);
    throw error;
  }
};


app.get('/api/pessoas/aberto/filtro', async (req, res) => {
  try {
    const params = req.query;
    const endpoint = `/pessoas/aberto/filtro?${new URLSearchParams(params).toString()}`;
      const data = await makeApiRequest('GET', endpoint);
    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar pessoas:', error.message);
    res.status(500).json({ 
      error: 'Erro ao carregar dados das pessoas desaparecidas',
      message: error.message 
    });
  }
});

app.get('/api/pessoas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await makeApiRequest('GET', `/pessoas/${id}`);
    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar pessoa:', error.message);
    res.status(500).json({ 
      error: 'Erro ao carregar dados da pessoa',
      message: error.message 
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend proxy server is running',
    timestamp: new Date().toISOString()
  });
});

app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Rota não encontrada',
    path: req.originalUrl 
  });
});

app.use((error, req, res, next) => {
  console.error('Erro no servidor:', error);
  res.status(500).json({ 
    error: 'Erro interno do servidor',
    message: error.message 
  });
});

app.listen(PORT, () => {
  console.log(`proxy server running on port ${PORT}`);
});
