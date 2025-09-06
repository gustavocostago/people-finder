import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataView } from 'primereact/dataview';
import { Paginator } from 'primereact/paginator';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import { PersonCard } from '../components/PersonCard';
import { SearchForm } from '../components/SearchForm';
import { personService } from '../services/api';
import type { Person, SearchParams } from '../types';

export const HomePage = () => {
  const navigate = useNavigate();
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  const [searchParams, setSearchParams] = useState<SearchParams>({});

  const loadPersons = async (params: SearchParams = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await personService.getPersons({
        ...params,
        page: currentPage,
        size: pageSize,
      });
      
      setPersons(response.content);
      setTotalRecords(response.totalElements);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
      setPersons([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPersons(searchParams);
  }, [currentPage, searchParams]);

  const handleSearch = (params: SearchParams) => {
    setSearchParams(params);
    setCurrentPage(0);
  };

  const handlePageChange = (event: any) => {
    setCurrentPage(event.page);
  };

  const handleViewDetails = (id: number) => {
    navigate(`/person/${id}`);
  };

  const itemTemplate = (person: Person) => (
    <PersonCard
      key={person.id}
      person={person}
      onViewDetails={handleViewDetails}
    />
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Pessoas Desaparecidas
        </h1>
        <p className="text-gray-600">
          Ajude a encontrar pessoas desaparecidas em Mato Grosso
        </p>
      </div>

      <SearchForm onSearch={handleSearch} loading={loading} />

      {error && (
        <Message
          severity="error"
          text={error}
          className="mb-6"
        />
      )}

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <ProgressSpinner />
        </div>
      ) : (
        <>
          <div className="mb-6">
            <p className="text-gray-600">
              {totalRecords > 0 
                ? `Encontradas ${totalRecords} pessoas` 
                : 'Nenhuma pessoa encontrada'
              }
            </p>
          </div>

          {persons.length > 0 ? (
            <>
              <DataView
                value={persons}
                itemTemplate={itemTemplate}
                layout="grid"
                className="mb-6"
              />

              <Paginator
                first={currentPage * pageSize}
                rows={pageSize}
                totalRecords={totalRecords}
                onPageChange={handlePageChange}
                template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros"
                rowsPerPageOptions={[10, 20, 50]}
              />
            </>
          ) : (
            <div className="text-center py-12">
              <i className="pi pi-search text-6xl text-gray-400 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Nenhum resultado encontrado
              </h3>
              <p className="text-gray-500">
                Tente ajustar os filtros de busca
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};
