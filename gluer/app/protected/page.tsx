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
    <div className="flex w-screen min-h-screen p-6 overflow-x-auto">
      {/* Sección izquierda - Mis Ajustes */}
      <div className="w-1/3 pr-6 border-r flex flex-col gap-6">
        <h2 className="text-2xl font-bold">Mis Ajustes</h2>
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
      </div>

      {/* Sección derecha - Mi Dashboard */}
      <div className="w-2/3 pl-6 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Mi Dashboard</h2>
          <div className="flex gap-2">
            <Button variant="outline">Filtrar por campaña</Button>
            <Button variant="outline">Filtrar por red social</Button>
          </div>
        </div>
        <div className="bg-gray-200 h-64 flex items-center justify-center rounded-lg shadow">
          <span className="text-gray-500">Gráfico aquí</span>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline">Recomendaciones</Button>
          <Button variant="outline">Ver detalles técnicos</Button>
          <Button variant="destructive">Borrar campaña publicitaria</Button>
          <Button>Agregar campaña publicitaria</Button>
        </div>
      </div>
    </div>
  );
}