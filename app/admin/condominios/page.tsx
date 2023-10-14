import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumbs';
import CondList from './components/CondList';
import { Database } from '@/app/types/supabase';
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Condomínios | GCon",
    description: "Página de gerenciamento de condomínios",
    // other metadata
};
type Condominio = Database['public']['Tables']['condominios']['Row'];
interface CondominioWithEmail extends Condominio {
    perfil_usuarios: {
        email: string;
    }[];
}

export const dynamic = 'force-dynamic'

async function CondominiosPage() {

    const supabase = createServerComponentClient({ cookies });

    // Obtenha o usuário atual
    const { data: { user } } = await supabase.auth.getUser();

    // Se não houver usuário, retorne um erro ou uma mensagem apropriada

    // Obtenha o perfil do usuário atual usando o user_id
    const { data: userProfile } = await supabase
        .from('perfil_usuarios')
        .select('id, tipo')
        .eq('user_id', user?.id)
        .single();

    // Se o tipo do usuário não for administrador, filtre os condomínios por perfil_id
    let condominiosData;
    if (userProfile?.tipo !== 'admin') {
        const { data, error } = await supabase
            .from('condominios')
            .select(`
                id,
                created_at,
                nome,
                endereco,
                contato,
                perfil_id,
                perfil_usuarios ( email )
            `)
            .eq('perfil_id', userProfile?.id); // Agora estamos usando o ID do perfil para filtrar
        condominiosData = data as CondominioWithEmail[];
    } else {
        const { data, error } = await supabase
            .from('condominios')
            .select(`
                id,
                created_at,
                nome,
                endereco,
                contato,
                perfil_id,
                  perfil_usuarios ( email )
            `);
        condominiosData = data as CondominioWithEmail[];
    }

    //console.log(condominiosData, 'condominiosData')

    return (
        <div className='flex flex-col'>

            <Breadcrumb
                separator={<span> / </span>}
                activeClasses='text-primary'
                containerClasses='flex py-5 bg-gradient-to-r from-purple-600 to-blue-600 float-right'
                listClasses='text-xl mx-2 font-semibold text-black dark:text-white hover:text-primary'
                capitalizeLinks
            />
            <CondList condominios={condominiosData} userType={userProfile?.tipo} />
        </div>

    )
}

export default CondominiosPage