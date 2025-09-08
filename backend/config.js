import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3001,
  
  apiBaseUrl: process.env.API_BASE_URL,

  cors: {
    origins: [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:4173',
      'http://localhost:8080',
    ],
    credentials: true
  },
  apiTimeout: 10000
};
