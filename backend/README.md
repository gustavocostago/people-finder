# Backend Proxy Server

Este é um servidor proxy simples que se comunica com a API original para alimentar o frontend

## Configuração

1. Instale as dependências:
```bash
cd backend
npm install
```

2. Configure as variáveis de ambiente (opcional):
```bash
# Porta do servidor (padrão: 3001)
export PORT=3001

export API_BASE_URL
```

## Execução

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm start
```

## Rotas Disponíveis

- `GET /api/pessoas/aberto/filtro` - Buscar pessoas com filtros
- `GET /api/pessoas/:id` - Buscar pessoa por ID
- `POST /api/informacoes` - Enviar informações (com upload de arquivo)
- `GET /api/health` - Health check

## CORS

O servidor está configurado para aceitar requisições dos seguintes origins:
- http://localhost:5173 (Vite dev server)
- http://localhost:3000 (React dev server)
- http://localhost:4173 (Vite preview)
