export interface Person {
  id: number;
  nome: string;
  dataNascimento: string;
  dataDesaparecimento: string;
  ultimaOcorrencia: {
    dtDesaparecimento: string;
    localDesaparecimento: string;
    boletimOcorrencia: string;
    status: 'DESAPARECIDA' | 'LOCALIZADA';
  };
  caracteristicas: {
    cor: string;
    sexo: string;
    olhos: string;
    cabelos: string;
    tipoFisico: string;
    altura: string;
    peso: string;
    deficiencia: string;
    acessorio: string;
    cicatriz: string;
    tatuagem: string;
    outros: string;
  };
  urlFoto: string;
  contato: {
    nome: string;
    telefone: string;
    email: string;
  };
}

export interface ApiResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export interface SearchParams {
  nome?: string;
  dataNascimento?: string;
  dataDesaparecimento?: string;
  status?: string;
  page?: number;
  size?: number;
}

export interface ContactForm {
  nome: string;
  telefone: string;
  email: string;
  localizacao: string;
  observacoes: string;
  foto?: File;
}
