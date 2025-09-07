import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import { Divider } from 'primereact/divider';
import { ContactForm } from '../components/ContactForm';
import { personService } from '../services/api';
import type { Person, ContactForm as ContactFormType } from '../types';
import { formatDate, getStatusColor, getStatusText } from '../utils/formatters';
import { Image } from 'primereact/image';

export const PersonDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [submittingInfo, setSubmittingInfo] = useState(false);

  useEffect(() => {
    if (id) {
      loadPerson(parseInt(id));
    }
  }, [id]);

  const loadPerson = async (personId: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await personService.getPersonById(personId);
      setPerson(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados da pessoa');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitInformation = async (formData: ContactFormType) => {
    setSubmittingInfo(true);
    
    try {
      const submitData = new FormData();
      submitData.append('pessoaId', id || '');
      submitData.append('nome', formData.nome);
      submitData.append('telefone', formData.telefone);
      submitData.append('email', formData.email);
      submitData.append('localizacao', formData.localizacao);
      submitData.append('observacoes', formData.observacoes);
      
      if (formData.foto) {
        submitData.append('foto', formData.foto);
      }

      await personService.submitInformation(submitData);
      setShowContactForm(false);
      
      alert('Informações enviadas com sucesso!');
    } catch (err) {
      alert('Erro ao enviar informações. Tente novamente.');
    } finally {
      setSubmittingInfo(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ProgressSpinner />
      </div>
    );
  }

  if (error || !person) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Message
          severity="error"
          text={error || 'Pessoa não encontrada'}
        />
        <Button
          label="Voltar"
          icon="pi pi-arrow-left"
          onClick={() => navigate('/')}
          className="mt-4"
        />
      </div>
    );
  }

  const statusColor = getStatusColor(person.ultimaOcorrencia.status);
  const statusText = getStatusText(person.ultimaOcorrencia.status);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button
          label="Voltar"
          icon="pi pi-arrow-left"
          onClick={() => navigate('/')}
          severity="secondary"
          className="mb-4"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <div className="text-center">
              <Image
                src={person.urlFoto || '/placeholder-person.jpg'}
                alt={person.nome}
                width="250"
              />
              
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {person.nome}
              </h1>
              
              <Tag
                value={statusText}
                className={`px-4 py-2 rounded-full text-sm font-medium ${statusColor}`}
              />
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <div className="space-y-6">
            <Card title="Informações Pessoais">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Data de Nascimento</label>
                  <p className="text-gray-800">{formatDate(person.dataNascimento)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Idade</label>
                  <p className="text-gray-800">
                    {new Date().getFullYear() - new Date(person.dataNascimento).getFullYear()} anos
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Sexo</label>
                  <p className="text-gray-800">{person.caracteristicas?.sexo}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Cor</label>
                  <p className="text-gray-800">{person.caracteristicas?.cor}</p>
                </div>
              </div>
            </Card>

            <Card title="Características Físicas">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Altura</label>
                  <p className="text-gray-800">{person.caracteristicas?.altura || 'Não informado'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Peso</label>
                  <p className="text-gray-800">{person.caracteristicas?.peso || 'Não informado'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Tipo Físico</label>
                  <p className="text-gray-800">{person.caracteristicas?.tipoFisico || 'Não informado'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Cor dos Olhos</label>
                  <p className="text-gray-800">{person.caracteristicas?.olhos || 'Não informado'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Cor dos Cabelos</label>
                  <p className="text-gray-800">{person.caracteristicas?.cabelos || 'Não informado'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Deficiência</label>
                  <p className="text-gray-800">{person.caracteristicas?.deficiencia || 'Não informado'}</p>
                </div>
              </div>
              
              {(person.caracteristicas?.acessorio || person.caracteristicas?.cicatriz || person.caracteristicas?.tatuagem || person.caracteristicas?.outros) && (
                <>
                  <Divider />
                  <div className="space-y-2">
                    {person.caracteristicas?.acessorio && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Acessórios</label>
                        <p className="text-gray-800">{person.caracteristicas?.acessorio}</p>
                      </div>
                    )}
                    {person.caracteristicas.cicatriz && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Cicatrizes</label>
                        <p className="text-gray-800">{person.caracteristicas.cicatriz}</p>
                      </div>
                    )}
                    {person.caracteristicas.tatuagem && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Tatuagens</label>
                        <p className="text-gray-800">{person.caracteristicas.tatuagem}</p>
                      </div>
                    )}
                    {person.caracteristicas.outros && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Outras Características</label>
                        <p className="text-gray-800">{person.caracteristicas.outros}</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </Card>

            <Card title="Informações do Desaparecimento">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Data do Desaparecimento</label>
                  <p className="text-gray-800">{formatDate(person.ultimaOcorrencia.dtDesaparecimento)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Local do Desaparecimento</label>
                  <p className="text-gray-800">{person.ultimaOcorrencia.localDesaparecimento}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Boletim de Ocorrência</label>
                  <p className="text-gray-800">{person.ultimaOcorrencia.boletimOcorrencia || 'Não informado'}</p>
                </div>
              </div>
            </Card>

            <Card title="Contato">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Nome do Contato</label>
                  <p className="text-gray-800">{person.contato?.nome}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Telefone</label>
                  <p className="text-gray-800">{person.contato?.telefone}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="text-gray-800">{person.contato?.email}</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Você tem informações sobre esta pessoa?
                </h3>
                <p className="text-gray-600 mb-6">
                  Qualquer informação pode ser importante para ajudar a localizar esta pessoa.
                </p>
                <Button
                  label="Enviar Informações"
                  icon="pi pi-send"
                  onClick={() => setShowContactForm(true)}
                  size="large"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>

      <ContactForm
        visible={showContactForm}
        onHide={() => setShowContactForm(false)}
        onSubmit={handleSubmitInformation}
        loading={submittingInfo}
      />
    </div>
  );
};
