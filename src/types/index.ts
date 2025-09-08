export interface Person {
  id: number;
  nome: string;
  idade: number;
  dataNascimento: string;
  dataDesaparecimento: string;
  ultimaOcorrencia: {
    dtDesaparecimento: string;
    localDesaparecimentoConcat: string;
    boletimOcorrencia: string;
    status: 'DESAPARECIDA' | 'LOCALIZADA';
    ocoId: number;
  };
  sexo?: string;
  caracteristicas?: Caracteristicas;
  contato?: Contato;
  urlFoto: string;

}

export interface Contato {
  nome: string;
  telefone: string;
  email: string;
}

export interface Caracteristicas {
  cor?: string;
  sexo?: string;
  olhos: string;
  cabelos?: string;
  tipoFisico?: string;
  altura?: string;
  peso?: string;
  deficiencia?: string;
  acessorio?: string;
  cicatriz?: string;
  tatuagem?: string;
  outros?: string;
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
  faixaIdadeInicial?: number;
  faixaIdadeFinal?: number;
  sexo?: 'MASCULINO' | 'FEMININO';
  status?: 'DESAPARECIDO' | 'LOCALIZADO';
  pagina?: number;
  porPagina?: number;
}

export interface ContactForm {
  nome: string;
  telefone: string;
  email: string;
  dataVisto: Date | null;
  localizacao: string;
  observacoes: string;
  foto?: File;
}
