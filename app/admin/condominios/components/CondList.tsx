'use client'
import { Database } from '@/app/types/supabase';
import Link from 'next/link';
import { useState } from 'react';
import Modal from './Modal';
import CondForm from './CondForm';
import { AiOutlinePlus } from 'react-icons/ai';

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

    const [showModal, setShowModal] = useState(false);
    const [condData, setCondData] = useState<Database['public']['Tables']['condominios']['Row'] | null>(null);

    const openAddCondominioModal = () => {
        setShowModal(true);
        setCondData(null);
    };

    if (condominios?.length === 0 && userType == 'admin') return <div>Não há condomínios para serem exibidos, por favor adicione um.</div>
    if (condominios?.length === 0 && userType == 'cliente') return <div>Não há condomínios para serem exibidos.</div>

    return (
        <div className="flex flex-col justify-center">

            {/* Modal Insert Condomínio */}
            <Modal showModal={showModal} setShowModal={setShowModal} name="Condomínio">
                <div className="relative p-6 flex-auto">
                    <p className="my-4 text-body text-base leading-relaxed">
                        test form
                    </p>
                </div>
            </Modal>

            {/* ADD COND BUTTON */}
            {userType === 'admin' && (
                <button
                    type="button"
                    onClick={openAddCondominioModal}
                    className="w-fit uppercase text-sm inline-flex mb-5 leading-none items-center rounded-sm shadow hover:shadow-lg justify-center gap-2.5 bg-meta-3 hover:bg-opacity-90 active:bg-success ease-linear py-1 px-5 text-center font-medium text-white transition-all duration-150 lg:px-6 xl:px-7"
                >
                    <span className="text-xl">
                        <AiOutlinePlus />
                    </span>
                    Adicionar condomínio
                </button>
            )}
            <div className='w-fit grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-5'>
                {condominios?.map(condominio => (
                    <Link key={condominio.id} href={`/admin/condominios/${condominio.id}`}>
                        <div className="flex flex-col max-w-sm w-full rounded h-full overflow-hidden shadow-lg hover:scale-105 active:scale-100 duration-300">
                            <img className="w-full" src="/images/condominios/condominio-sustentavel.jpg" alt={condominio.nome} />
                            <div className="flex flex-col flex-1 px-6 py-4">
                                <div className="font-bold text-xl mb-2">{condominio.nome}</div>
                                <p className="text-gray-700 text-sm">
                                    {condominio.endereco}
                                </p>
                            </div>
                            <div className="flex px-6 pt-4 pb-2">
                                <span className="inline-block bg-bodydark1 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"> {(condominio.perfil_usuarios as any).email}</span>
                            </div>
                        </div>
                    </Link>

                ))}
            </div>
        </div>
    )
}

export default CondList