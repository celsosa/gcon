import { Database } from '@/app/types/supabase';
import Link from 'next/link';

type Condominio = Database['public']['Tables']['condominios']['Row'];

interface ExtendedCondominio extends Condominio {
    perfil_usuarios: {
        email: string;
    }[];
}

interface CondListProps {
    condominios: ExtendedCondominio[] | null;
    userType: string;
}

function CondList({ condominios, userType }: CondListProps) {

    if (condominios?.length === 0 && userType == 'admin') return <div>Não há condomínios para serem exibidos, por favor adicione um.</div>
    if (condominios?.length === 0 && userType == 'cliente') return <div>Não há condomínios para serem exibidos.</div>

    return (
        <>
            <div className='w-fit grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2  gap-5'>
                {condominios?.map(condominio => (
                    <Link key={condominio.id} href={`/admin/condominios/${condominio.id}`}>
                        <div className="max-w-sm w-full rounded overflow-hidden shadow-lg hover:scale-105 active:scale-100 duration-300">
                            <img className="w-full" src="/images/condominios/condominio-sustentavel.jpg" alt={condominio.nome} />
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{condominio.nome}</div>
                                <p className="text-gray-700 text-base">
                                    {condominio.endereco}
                                </p>
                            </div>
                            <div className="px-6 pt-4 pb-2">
                            // @ts-ignore
                                <span className="inline-block bg-bodydark1 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"> {(condominio.perfil_usuarios as any).email}</span>
                            </div>
                        </div>
                    </Link>

                ))}
            </div>
        </>
    )
}

export default CondList