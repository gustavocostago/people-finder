import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import type { SearchParams } from '../types';

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  loading?: boolean;
}

export const SearchForm = ({ onSearch, loading = false }: SearchFormProps) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    nome: undefined,
    faixaIdadeInicial: undefined,
    faixaIdadeFinal: undefined,
    sexo: undefined,
    status: undefined,
  });

  const statusOptions = [
    { label: 'Todas', value: undefined },
    { label: 'Desaparecida', value: 'DESAPARECIDO' },
    { label: 'Localizada', value: 'LOCALIZADO' },
  ];

  const sexoOptions = [
    { label: 'Todos', value: undefined },
    { label: 'Masculino', value: 'MASCULINO' },
    { label: 'Feminino', value: 'FEMININO' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  const handleClear = () => {
    setSearchParams({
      nome: '',
      faixaIdadeInicial: undefined,
      faixaIdadeFinal: undefined,
      sexo: undefined,
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
          <label htmlFor="faixaIdadeInicial" className="text-sm font-medium text-gray-700 mb-1">
            Idade
          </label>
          <InputNumber
            id="faixaIdadeInicial"
            value={searchParams.faixaIdadeInicial}
            onChange={(e) => setSearchParams({ ...searchParams, faixaIdadeInicial: e.value || undefined })}
            placeholder="Digite a faixa de idade"
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

        <div className="flex flex-col">
          <label htmlFor="sexo" className="text-sm font-medium text-gray-700 mb-1">
            Sexo
          </label>
          <Dropdown
            id="sexo"
            value={searchParams.sexo}
            options={sexoOptions}
            onChange={(e) => setSearchParams({ ...searchParams, sexo: e.value })}
            placeholder="Selecione o sexo"
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
