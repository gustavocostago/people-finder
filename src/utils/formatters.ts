export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
};

export const formatPhone = (phone: string): string => {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  return phone;
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'DESAPARECIDA':
      return 'text-red-600 bg-red-100';
    case 'LOCALIZADA':
      return 'text-green-600 bg-green-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

export const getStatusText = (status: string): string => {
  switch (status) {
    case 'DESAPARECIDA':
      return 'Desaparecida';
    case 'LOCALIZADA':
      return 'Localizada';
    default:
      return status;
  }
};
