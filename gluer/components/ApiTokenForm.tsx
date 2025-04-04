'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ApiTokenForm() {
  const [isEditable, setIsEditable] = useState(false);
  const [tokens, setTokens] = useState({
    google: '',
    facebook: '',
    tiktok: '',
  });

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTokens({ ...tokens, [name]: value });
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">API Tokens</h2>
      <div className="flex flex-col gap-4">
        <Input
          type="text"
          name="google"
          placeholder="Google API Token"
          value={tokens.google}
          onChange={handleChange}
          disabled={!isEditable}
        />
        <Input
          type="text"
          name="facebook"
          placeholder="Facebook API Token"
          value={tokens.facebook}
          onChange={handleChange}
          disabled={!isEditable}
        />
        <Input
          type="text"
          name="tiktok"
          placeholder="TikTok API Token"
          value={tokens.tiktok}
          onChange={handleChange}
          disabled={!isEditable}
        />
        <Button onClick={toggleEdit} className="mt-2">
          {isEditable ? 'Confirmar' : 'Editar'}
        </Button>
      </div>

      {/* Acciones adicionales */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
        <Button variant="outline">Filtrar por campaña</Button>
        <Button variant="outline">Filtrar por red social</Button>
        <Button variant="outline">Recomendaciones</Button>
        <Button variant="outline">Ver detalles técnicos</Button>
        <Button variant="destructive">Borrar campaña publicitaria</Button>
        <Button>Agregar campaña publicitaria</Button>
      </div>
    </div>
  );
}
