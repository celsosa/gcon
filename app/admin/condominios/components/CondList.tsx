import { Condominio } from '@/app/types';
import Link from 'next/link';

interface CondListProps {
    condominios: Condominio[] | null;
    userType: string
}

function CondList({ condominios, userType }: CondListProps) {

    if (condominios?.length === 0 && userType == 'admin') return <div>Não há condomínios para serem exibidos, por favor adicione um.</div>
    if (condominios?.length === 0 && userType == 'cliente') return <div>Não há condomínios para serem exibidos.</div>

    return (
        <>
            <div>
                {condominios?.map(condominio => (
                    <Link key={condominio.id} href={`/admin/condominios/${condominio.id}`}>
                        <div className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer hover:scale-105 active:scale-100 duration-300">
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
                    </Link>
                ))}
            </div>
        </>
    )
}

export default CondList