import axios from 'axios';
import type { Person, ApiResponse, SearchParams } from '../types';

const API_BASE_URL = 'https://abitus-api.gela.vip';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const personService = {
  async getPersons(params: SearchParams = {}): Promise<ApiResponse<Person>> {
    try {
      const response = await api.get('/pessoas', { params });
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
