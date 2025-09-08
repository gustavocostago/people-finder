import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import type { SearchParams } from '../types';

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  loading?: boolean;
}

export const SearchForm = ({ onSearch, loading = false }: SearchFormProps) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    nome: '',
    dataNascimento: undefined,
    dataDesaparecimento: undefined,
    status: undefined,
  });

  const statusOptions = [
    { label: 'Todas', value: undefined },
    { label: 'Desaparecida', value: 'DESAPARECIDA' },
    { label: 'Localizada', value: 'LOCALIZADA' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  const handleClear = () => {
    setSearchParams({
      nome: '',
      dataNascimento: undefined,
      dataDesaparecimento: undefined,
      status: undefined,
    });
    onSearch({});
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex flex-col">
          <label htmlFor="nome" className="text-sm font-medium text-gray-700 mb-1">
            Nome
          </label>
          <InputText
            id="nome"
            value={searchParams.nome || ''}
            onChange={(e) => setSearchParams({ ...searchParams, nome: e.target.value })}
            placeholder="Digite o nome"
            className="w-full"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="dataNascimento" className="text-sm font-medium text-gray-700 mb-1">
            Data de Nascimento
          </label>
          <Calendar
            id="dataNascimento"
            value={searchParams.dataNascimento ? new Date(searchParams.dataNascimento) : null}
            onChange={(e) => setSearchParams({ 
              ...searchParams, 
              dataNascimento: e.value ? e.value.toISOString().split('T')[0] : undefined 
            })}
            dateFormat="dd/mm/yy"
            placeholder="Selecione a data"
            className="w-full"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="dataDesaparecimento" className="text-sm font-medium text-gray-700 mb-1">
            Data de Desaparecimento
          </label>
          <Calendar
            id="dataDesaparecimento"
            value={searchParams.dataDesaparecimento ? new Date(searchParams.dataDesaparecimento) : null}
            onChange={(e) => setSearchParams({ 
              ...searchParams, 
              dataDesaparecimento: e.value ? e.value.toISOString().split('T')[0] : undefined 
            })}
            dateFormat="dd/mm/yy"
            placeholder="Selecione a data"
            className="w-full"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="status" className="text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <Dropdown
            id="status"
            value={searchParams.status}
            options={statusOptions}
            onChange={(e) => setSearchParams({ ...searchParams, status: e.value })}
            placeholder="Selecione o status"
            className="w-full"
          />
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <Button
          type="submit"
          label="Buscar"
          icon="pi pi-search"
          severity="secondary"
          loading={loading}
          rounded
          outlined
          className="flex-1"
        />
        <Button
          type="button"
          label="Limpar"
          icon="pi pi-times"
          severity="secondary"
          rounded
          outlined
          onClick={handleClear}
          className="flex-1"
        />
      </div>
    </form>
  );
};
