import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import type { ContactForm as ContactFormType } from '../types';
import { Calendar } from 'primereact/calendar';
interface ContactFormProps {
  visible: boolean;
  onHide: () => void;
  onSubmit: (data: ContactFormType) => void;
  loading?: boolean;
}

export const ContactForm = ({ visible, onHide, onSubmit, loading = false }: ContactFormProps) => {
  const [formData, setFormData] = useState<ContactFormType>({
    nome: '',
    telefone: '',
    email: '',
    localizacao: '',  
    dataVisto: null,
    observacoes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.observacoes.trim()) {
      newErrors.observacoes = 'Observações são obrigatórias';
    }

    if (!formData.dataVisto) {
      newErrors.dataVisto = 'Data da visualização é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };


  const handleFileSelect = (e: any) => {
    const file = e.files[0];
    if (file) {
      setFormData({ ...formData, foto: file });
    }
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      telefone: '',
      email: '',
      localizacao: '',
      dataVisto: null,
      observacoes: '',
    }); 
    setErrors({});
  };

  const handleHide = () => {
    resetForm();
    onHide();
  };

  return (
    <Dialog
      header="Enviar Informações"
      visible={visible}
      onHide={handleHide}
      style={{ width: '90vw', maxWidth: '600px' }}
      modal
    >
      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="flex flex-col">
          <label htmlFor="dataVisto" className="text-sm font-medium text-gray-700 mb-1">
            Data da visualização *
          </label>
          <Calendar
            id="dataVisto"
            value={formData.dataVisto ? new Date(formData.dataVisto) : null}
            onChange={(e) => setFormData({ ...formData, dataVisto: e.value ? e.value : null })}
            dateFormat="dd/mm/yy"
            placeholder="Selecione a data"
            className={errors.dataVisto ? 'p-invalid' : ''}
          />
          {errors.dataVisto && <small className="text-red-500">{errors.dataVisto}</small>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="observacoes" className="text-sm font-medium text-gray-700 mb-1">
            Informações *
          </label>
          <InputTextarea
            id="observacoes"
            value={formData.observacoes}
            onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
            placeholder="Descreva as informações que você tem..."
            rows={4}
            className={errors.observacoes ? 'p-invalid' : ''}
          />
          {errors.observacoes && <small className="text-red-500">{errors.observacoes}</small>}
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Foto (opcional)
          </label>
          <FileUpload
            mode="basic"
            name="foto"
            accept="image/*"
            maxFileSize={5000000}
            customUpload
            uploadHandler={handleFileSelect}
            chooseLabel="Escolher Foto"
            className="w-full"
          />
          <small className="text-gray-500">Máximo 5MB</small>
        </div>

        <div className="flex gap-2 pt-4">
          <Button
            type="submit"
            label="Enviar Informações"
            icon="pi pi-send"
            loading={loading}
            className="flex-1"
            severity="secondary"
            outlined
          />
          <Button
            type="button"
            label="Cancelar"
            icon="pi pi-times"
            onClick={handleHide}
            className="flex-1"  
            severity="danger"
            outlined
          />
        </div>
      </form>
    </Dialog>
  );
};
