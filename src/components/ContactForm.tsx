import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import type { ContactForm as ContactFormType } from '../types';

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
    observacoes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    } else if (!/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(formData.telefone)) {
      newErrors.telefone = 'Formato de telefone inválido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.localizacao.trim()) {
      newErrors.localizacao = 'Localização é obrigatória';
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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    let formatted = value;
    
    if (value.length >= 2) {
      formatted = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }
    if (value.length >= 7) {
      formatted = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6, 10)}`;
    }
    if (value.length >= 11) {
      formatted = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
    }

    setFormData({ ...formData, telefone: formatted });
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="nome" className="text-sm font-medium text-gray-700 mb-1">
              Nome *
            </label>
            <InputText
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              placeholder="Seu nome completo"
              className={errors.nome ? 'p-invalid' : ''}
            />
            {errors.nome && <small className="text-red-500">{errors.nome}</small>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="telefone" className="text-sm font-medium text-gray-700 mb-1">
              Telefone *
            </label>
            <InputText
              id="telefone"
              value={formData.telefone}
              onChange={handlePhoneChange}
              placeholder="(00) 00000-0000"
              className={errors.telefone ? 'p-invalid' : ''}
            />
            {errors.telefone && <small className="text-red-500">{errors.telefone}</small>}
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <InputText
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="seu@email.com"
            className={errors.email ? 'p-invalid' : ''}
          />
          {errors.email && <small className="text-red-500">{errors.email}</small>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="localizacao" className="text-sm font-medium text-gray-700 mb-1">
            Localização *
          </label>
          <InputText
            id="localizacao"
            value={formData.localizacao}
            onChange={(e) => setFormData({ ...formData, localizacao: e.target.value })}
            placeholder="Cidade, bairro, rua..."
            className={errors.localizacao ? 'p-invalid' : ''}
          />
          {errors.localizacao && <small className="text-red-500">{errors.localizacao}</small>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="observacoes" className="text-sm font-medium text-gray-700 mb-1">
            Observações
          </label>
          <InputTextarea
            id="observacoes"
            value={formData.observacoes}
            onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
            placeholder="Descreva as informações que você tem..."
            rows={4}
          />
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
          />
          <Button
            type="button"
            label="Cancelar"
            icon="pi pi-times"
            severity="secondary"
            onClick={handleHide}
            className="flex-1"
          />
        </div>
      </form>
    </Dialog>
  );
};
