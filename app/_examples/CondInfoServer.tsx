

'use client'
import React, { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

function CondInfo() {

    type Condominio = {
        id: number;
        created_at: Date;
        nome: string;
        endereco: string;
        contato: string;
    };

    const [condominios, setCondominios] = useState<Condominio[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClientComponentClient();

    useEffect(() => {
        const fetchCondominios = async () => {
            const { data } = await supabase.from('condominios').select('id, created_at, nome, endereco, contato');
            if (data) {
                setCondominios(data);
            }
            setLoading(false);
        };

        fetchCondominios();
    }, []);

    if (loading) {
        return <div>Carregando...</div>
    } else if (!condominios.length && !loading) {
        return <div>Não há condomínios para serem exibidos, por favor adicione um.</div>;
    }


    return (
        <>
            <div>
                {condominios.map(condominio => (
                    <div key={condominio.id} className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer hover:scale-105 active:scale-100 duration-300">
                        <img className="w-full" src="/images/condominios/condominio-sustentavel.jpg" alt={condominio.nome} />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{condominio.nome}</div>
                            <p className="text-gray-700 text-base">
                                {condominio.endereco}
                            </p>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <span className="inline-block bg-bodydark1 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                            <span className="inline-block bg-bodydark1 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                            <span className="inline-block bg-bodydark1 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default CondInfo;