'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export default function ApiTokenForm() {
  const [isEditable, setIsEditable] = useState(false);
  const [tokens, setTokens] = useState({
    google: '',
    facebook: '',
    tiktok: '',
  });

  // Cargar tokens al montar el componente
  useEffect(() => {
    const fetchTokens = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error('No hay usuario autenticado:', userError?.message);
        return;
      }

      const { data, error } = await supabase
        .from('user_api_tokens')
        .select('google_api_token, facebook_api_token, tiktok_api_token')
        .eq('user_id', user.id)
        .single();

      if (data) {
        setTokens({
          google: data.google_api_token ?? '',
          facebook: data.facebook_api_token ?? '',
          tiktok: data.tiktok_api_token ?? '',
        });
      } else if (error && error.code !== 'PGRST116') {
        console.error('Error al obtener tokens:', error.message);
      }
    };

    fetchTokens();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTokens((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEdit = async () => {
    if (isEditable) {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error('No hay usuario autenticado:', userError?.message);
        return;
      }

      const { error } = await supabase.from('user_api_tokens').upsert(
        {
          user_id: user.id,
          google_api_token: tokens.google,
          facebook_api_token: tokens.facebook,
          tiktok_api_token: tokens.tiktok,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' }
      );

      if (error) {
        console.error('Error al guardar tokens:', error.message);
        return;
      }
    }

    setIsEditable((prev) => !prev);
  };

  return (
    <div className="flex w-full max-w-6xl min-h-[75vh] px-6 py-4 mx-auto overflow-hidden">
      {/* Columna izquierda: Ajustes */}
      <div className="w-[30%] flex flex-col items-start">
        <div className="pr-6 border-r border-gray-300 h-[320px] flex flex-col gap-6">
          <h2 className="text-xl font-bold">Ajustes</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <label className="w-32 text-sm font-medium">G Token</label>
              <Input
                type="text"
                name="google"
                placeholder="Google Token"
                value={tokens.google}
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="w-32 text-sm font-medium">F Token</label>
              <Input
                type="text"
                name="facebook"
                placeholder="Facebook Token"
                value={tokens.facebook}
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="w-32 text-sm font-medium">T Token</label>
              <Input
                type="text"
                name="tiktok"
                placeholder="TikTok Token"
                value={tokens.tiktok}
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>

            <Button onClick={toggleEdit} className="mt-2">
              {isEditable ? 'Confirmar' : 'Editar'}
            </Button>
          </div>
        </div>
      </div>

      {/* Columna derecha: Dashboard */}
      <div className="w-[70%] px-6 flex flex-col gap-6">
        <div className="flex justify-between items-center flex-wrap">
          <h2 className="text-2xl font-bold">Mi Dashboard</h2>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline">Filtrar por campaña</Button>
            <Button variant="outline">Filtrar por red social</Button>
          </div>
        </div>

        <div className="w-full bg-gray-200 h-64 flex items-center justify-center rounded-lg shadow">
          <span className="text-gray-500">Gráfico aquí</span>
        </div>

        <div className="flex justify-end gap-2 flex-wrap">
          <Button variant="outline">Recomendaciones</Button>
          <Button variant="outline">Ver detalles técnicos</Button>
          <Button variant="destructive">Borrar campaña publicitaria</Button>
          <Button>Agregar campaña publicitaria</Button>
        </div>
      </div>
    </div>
  );
}
