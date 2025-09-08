import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import type { Person } from '../types';
import { formatDate, getStatusColor, getStatusText } from '../utils/formatters';

interface PersonCardProps {
  person: Person;
  onViewDetails: (id: number) => void;
}

export const PersonCard = ({ person, onViewDetails }: PersonCardProps) => {
  const statusColor = getStatusColor(person.ultimaOcorrencia.status ?? 'DESAPARECIDA');
  const statusText = getStatusText(person.ultimaOcorrencia.status ?? 'DESAPARECIDA');

  return (
    <Card
      className="h-full flex flex-col"
      style={{
        height: '550px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >

      <div
        className="flex justify-center mb-4"
        style={{
          height: '192px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        <img
          src={person.urlFoto || '/src/assets/not-found.jpg'}
          alt={person.nome}
          className="max-h-full max-w-full object-cover rounded-lg"
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'cover'
          }}
        />
      </div>

      <div
        className="flex-1 flex flex-col justify-between"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            className="mb-4"
            style={{
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <h3
              className="text-lg font-semibold text-center leading-tight"
              style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                textAlign: 'center',
                lineHeight: '1.25',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                wordWrap: 'break-word',
                hyphens: 'auto'
              }}
              title={person.nome.toUpperCase()}
            >
              {person.nome.toUpperCase()}
            </h3>
          </div>


          <div
            className="space-y-2 mb-4 text-sm text-gray-700"
            style={{
              height: '90px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div className="flex justify-between items-center">
              <span>Idade:</span>
              <span className="font-medium">
                {person.idade} anos
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span>Desapareceu:</span>
              <span className="font-medium">
                {formatDate(person.ultimaOcorrencia.dtDesaparecimento)}
              </span>
            </div>
            
            <div className="flex justify-between items-start">
              <span className="flex-shrink-0">Local:</span>
              <span
                className="font-medium text-right ml-2"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  lineHeight: '1.2',
                  fontSize: '0.875rem'
                }}
                title={person.ultimaOcorrencia.localDesaparecimentoConcat}
              >
                {person.ultimaOcorrencia.localDesaparecimentoConcat}
              </span>
            </div>
          </div>
        </div>
        
        <div
          className="flex flex-col gap-3"
          style={{
            height: '80px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >

          <div className="flex justify-center">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}
              style={{
                fontSize: '0.75rem',
                whiteSpace: 'nowrap'
              }}
            >
              {statusText}
            </span>
          </div>

          <Button
            label="Ver Detalhes"
            icon="pi pi-eye"
            className="w-full"
            style={{
              width: '100%',
              height: '36px'
            }}
            severity="secondary"
            outlined
            onClick={() => onViewDetails(person.id)}
          />
        </div>
      </div>
    </Card>
  );
};