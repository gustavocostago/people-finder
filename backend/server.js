import express from 'express';
import cors from 'cors';
import axios from 'axios';
import multer from 'multer';
import { config } from './config.js';


const app = express();
const PORT = config.port;

app.use(cors(config.cors));

app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Apenas arquivos de imagem são permitidos'), false);
    }
  }
});


const makeApiRequest = async (method, endpoint, data = null, headers = {}) => {
  try {
    const requestConfig = {
      method,
      url: `${config.apiBaseUrl}${endpoint}`,
      timeout: config.apiTimeout,
      headers: {
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

app.post('/api/informacoes', upload.single('foto'), async (req, res) => {
  try {
    const { ocoId, observacoes, dataVisto } = req.body;
    const foto = req.file;

    if (!ocoId || !observacoes || !dataVisto) {
      return res.status(400).json({
        error: 'Campos obrigatórios não preenchidos',
        message: 'Pessoa ID e observações são obrigatórios'
      });
    }
    
    const formData = new FormData();

    if (foto) {
        formData.append('files', foto.buffer, {
          filename: foto.originalname,
          contentType: foto.mimetype,
        });
    }

    const ocoIdNumber = parseInt(ocoId);
    const descricao = foto ? 'imagem' : 'descricao';

    const queryParams = new URLSearchParams({
      ocoId: String(ocoIdNumber),
      informacao: observacoes,
      data: dataVisto,
      ...(descricao ? { descricao } : {})
    }).toString();

    const endpoint = `/ocorrencias/informacoes-desaparecido?${queryParams}`;

    const data = await makeApiRequest(
      'POST', 
      endpoint, 
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          accept: '*/*',
        },
      }
    );

    res.json({
      success: true,
      message: 'Informações enviadas com sucesso',
      data: data
    });

  } catch (error) {
    console.error('Erro ao enviar informações:', error.message);
    res.status(500).json({ 
      error: 'Erro ao enviar informações',
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
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: 'Arquivo muito grande',
        message: 'O arquivo deve ter no máximo 5MB'
      });
    }
    return res.status(400).json({
      error: 'Erro no upload do arquivo',
      message: error.message
    });
  }
  
  if (error.message === 'Apenas arquivos de imagem são permitidos') {
    return res.status(400).json({
      error: 'Tipo de arquivo inválido',
      message: 'Apenas arquivos de imagem são permitidos'
    });
  }

  console.error('Erro no servidor:', error);
  res.status(500).json({ 
    error: 'Erro interno do servidor',
    message: error.message 
  });
});

app.listen(PORT, () => {
  console.log(`proxy server running on port ${PORT}`);
});
