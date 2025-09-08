import axios from 'axios';
import type { Person, ApiResponse, SearchParams } from '../types';


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
});

export const personService = {
  async getPersons(params: SearchParams = {}): Promise<ApiResponse<Person>> {
    try {
      const response = await api.get('/pessoas/aberto/filtro', { params});
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar pessoas:', error);
      throw new Error('Erro ao carregar dados das pessoas desaparecidas');
    }
  },

  async getPersonById(id: number): Promise<Person> {
    try {
      const response = await api.get(`/pessoas/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar pessoa:', error);
      throw new Error('Erro ao carregar dados da pessoa');
    }
  },

  async submitInformation(data: FormData): Promise<void> {
    try {
      await api.post('/informacoes', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error('Erro ao enviar informações:', error);
      throw new Error('Erro ao enviar informações');
    }
  }
};
