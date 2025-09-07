import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import type { Person } from '../types';
import { Image } from 'primereact/image';
import { formatDate, getStatusColor, getStatusText } from '../utils/formatters';

interface PersonCardProps {
  person: Person;
  onViewDetails: (id: number) => void;
}

export const PersonCard = ({ person, onViewDetails }: PersonCardProps) => {
  const statusColor = getStatusColor(person.ultimaOcorrencia.status);
  const statusText = getStatusText(person.ultimaOcorrencia.status);

  return (
    <Card className="h-full flex flex-col">
      <div className="flex justify-center mb-4">
        <Image
          src={person.urlFoto}
          alt={person.nome}
          className="w-full h-full object-cover"
          preview
        />
      </div>
      
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-center">{person.nome}</h3>
          
          <div className="space-y-2 mb-4 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Idade:</span>
              <span className="font-medium">
                {new Date().getFullYear() - new Date(person.dataNascimento).getFullYear()} anos
              </span>
            </div>
            
            <div className="flex justify-between">
              <span>Desapareceu:</span>
              <span className="font-medium">{formatDate(person.ultimaOcorrencia.dtDesaparecimento)}</span>
            </div>
            
            <div className="flex justify-between">
              <span>Local:</span>
              <span className="font-medium truncate ml-2">
                {person.ultimaOcorrencia.localDesaparecimento}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          <div className="flex justify-center mb-2">
            <Tag
              value={statusText}
              className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}
            />
          </div>

          <Button
            label="Ver Detalhes"
            icon="pi pi-eye"
            className="w-full"
            onClick={() => onViewDetails(person.id)}
          />
        </div>
      </div>
    </Card>
  );
};
