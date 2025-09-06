# 🧩 Sistema de Pessoas Desaparecidas - MT

Uma Single Page Application (SPA) desenvolvida em React + TypeScript para consulta e envio de informações sobre pessoas desaparecidas, consumindo a API da Polícia Judiciária Civil de Mato Grosso.

## 🚀 Tecnologias Utilizadas

- **React 18** com TypeScript
- **Vite** para build e desenvolvimento
- **PrimeReact** para componentes UI
- **Tailwind CSS** para estilização
- **React Router** para navegação
- **Axios** para requisições HTTP
- **Docker** para containerização

## 📦 Instalação

### Pré-requisitos

- Node.js 20+ 
- npm ou yarn
- Docker (opcional)

### Instalação Local

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITORIO]
cd desenvolve-mt
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

4. Acesse a aplicação em: `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

## 🐳 Execução com Docker

### Usando Docker Compose (Recomendado)

```bash
docker-compose up --build
```

### Usando Docker

```bash
docker build -t pessoas-desaparecidas .
docker run -p 3000:80 pessoas-desaparecidas
```

A aplicação estará disponível em: `http://localhost:3000`

## 🧪 Testes

### Executar Testes

```bash
npm run test
```

### Executar Lint

```bash
npm run lint
```
