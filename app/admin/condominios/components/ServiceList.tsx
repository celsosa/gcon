'use client'
import { Database } from "@/app/types/supabase";
import { AiOutlinePlus } from 'react-icons/ai';
import Modal from "./Modal";
import ServiceForm from "./ServiceForm";
import { PiDotsThreeOutlineVerticalFill } from 'react-icons/pi';
import { AiFillWarning, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Menu, Transition } from '@headlessui/react'
import { Fragment, JSX, SVGProps, useState } from 'react'
import { removeService } from "../functions/actions";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Servico = Database['public']['Tables']['servicos']['Row'];
interface ServiceListProps {
    servicos: Servico[] | null;
    condominioNome: string;
    condominioId: number;
    userType: string;
}


function ServiceList({ servicos, condominioNome, condominioId, userType }: ServiceListProps) {

    const [serviceData, setServiceData] = useState<Database['public']['Tables']['servicos']['Row'] | null>(null);

    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');  // +1 pois getMonth() retorna 0-11
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    const [showModal, setShowModal] = useState(false);

    function closeModal() {
        setShowModal(false);
        setServiceData(null);
    }

    const handleEditService = (service: Servico) => {
        setShowModal(true);
        setServiceData(service);
    };


    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
    const [serviceToRemove, setServiceToRemove] = useState<Servico | null>(null);
    const [loading, setLoading] = useState(false);

    // Atualize sua função handleRemoveService para definir o serviço a ser removido
    const handleRemoveService = (service: Servico) => {
        setServiceToRemove(service);
        setShowDeleteConfirmationModal(true);
    };

    const handleConfirmDelete = async (service: Servico | null) => {
        setLoading(true)
        try {
            if (service && service.id) {
                await removeService(service.id);
                // Após a remoção bem-sucedida, você pode atualizar a lista de serviços aqui.
                // Pode ser necessário chamar uma função que busca os serviços novamente.
                toast.success('Serviço removido com sucesso.');
            }
        } catch (error) {
            console.error('Erro ao remover o serviço: ', error);
        } finally {
            setLoading(false);  // Reseta o estado de loading independentemente do sucesso ou falha
        }

        setShowDeleteConfirmationModal(false);
        setServiceToRemove(null);
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirmationModal(false);
        setServiceToRemove(null);
    };

    return (
        <div className="flex flex-col">

            {/* Modal Insert/Edit service */}
            <Modal showModal={showModal} setShowModal={setShowModal} name="Serviço">
                <div className="relative p-6 flex-auto">
                    <p className="my-4 text-body text-base leading-relaxed">
                        <ServiceForm
                            onReset={() => setServiceData(null)}
                            serviceData={serviceData}
                            onUpdate={(data) => setServiceData(data)}
                            condominioId={condominioId}
                            setShowModal={setShowModal}
                        />

                    </p>
                </div>
            </Modal>

            {/* Modal Remove service */}
            <Modal showModal={showDeleteConfirmationModal} setShowModal={setShowDeleteConfirmationModal} name="Confirmação de Remoção">
                <div className="flex flex-col relative p-6 items-center text-center text-body text-lg leading-none">
                    <p className="text-lg font-semibold">
                        <AiFillWarning className="inline text-2xl text-danger" />
                        Tem certeza de que deseja remover este serviço?
                    </p>
                    <span className="text-base">(Essa ação não pode ser desfeita)</span>
                    <div className="flex gap-10 my-6">
                        {loading ?
                            <AiOutlineLoading3Quarters className="animate-spin text-2xl text-primary" />
                            : <>

                                <button className="bg-body w-22 hover:bg-opacity-90 active:bg-graydark active:scale-95 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={handleCancelDelete}>Não</button>
                                <button className="bg-danger w-22 hover:bg-opacity-80 active:bg-danger active:scale-95 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    onClick={() => handleConfirmDelete(serviceToRemove)}>
                                    Sim
                                </button>
                            </>
                        }
                    </div>
                </div>
            </Modal>

            {userType == 'admin' &&
                <button type="button"
                    onClick={() => {
                        setShowModal(true);
                        setServiceData(null);
                    }}
                    className="w-fit uppercase text-sm inline-flex mb-5 leading-none items-center rounded-sm shadow hover:shadow-lg justify-center gap-2.5 bg-meta-3 hover:bg-opacity-90 active:bg-success ease-linear py-1 px-5 text-center font-medium text-white transition-all duration-150 lg:px-6 xl:px-7"
                >
                    <span className="text-xl">
                        <AiOutlinePlus />
                    </span>
                    Adicionar serviço
                </button>
            }
            <div className="relative flex flex-col w-full min-w-0 mb-0 break-words bg-white border-0 border-transparent border-solid shadow-xl rounded-2xl bg-clip-border">
                <div className="p-6 pb-0 text-xl mb-4 font-medium rounded-t-2xl">
                    <h6>{condominioNome}</h6>
                </div>
                <div className="flex-auto px-0 pt-0 pb-2 overflow-x-auto">
                    <div className="p-0 ">
                        <table className="items-center w-full mb-0 align-top border-bodydark text-body">
                            <thead className="align-bottom text-primary">
                                <tr>
                                    <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-bodydark shadow-none text-xs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Serviço</th>
                                    <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-bodydark shadow-none text-xs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Data</th>
                                    <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-bodydark shadow-none text-xs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Nº da Nota</th>
                                    <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-bodydark shadow-none text-xs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Valor Total</th>
                                    <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-bodydark shadow-none text-xs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Valor Pago</th>
                                    <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-bodydark shadow-none text-xs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Status</th>
                                    <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-bodydark shadow-none text-xs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Nota Fiscal</th>
                                    <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-bodydark shadow-none text-xs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Comprovante</th>
                                    {userType == 'admin' && <th className="px-6 py-3 font-semibold capitalize align-middle bg-transparent border-b border-bodydark border-solid shadow-none tracking-none whitespace-nowrap text-slate-400 opacity-70"></th>}
                                </tr>
                            </thead>
                            <tbody>
                                {servicos && servicos.map(servico => (
                                    <>
                                        <tr key={servico.id}>
                                            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                <div className="flex px-2 py-1">
                                                    <div className="flex flex-col justify-center">
                                                        <h6 className="mb-0 font-semibold leading-tight text-sm">{servico.nome}</h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                <p className="mb-0 font-semibold leading-tight text-xs"> {formatDate(servico.data_servico)}</p>
                                            </td>
                                            <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                <span className="font-semibold leading-tight text-xs text-slate-400">{servico.id_nota}</span>
                                            </td>
                                            <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                <span className="font-semibold leading-tight text-xs text-slate-400">R${servico.valor_nota}</span>
                                            </td>
                                            <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                <span className="font-semibold leading-tight text-xs text-slate-400">R${servico.valor_pago}</span>
                                            </td>
                                            <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                <span className={`bg-gradient-to-tl ${servico.status_pagamento === 'pago' ? 'from-success to-meta-3' : servico.status_pagamento === 'pendente' ? 'from-body to-bodydark' : servico.status_pagamento === 'parcial' ? 'from-meta-8 to-meta-6' : ''} px-3 text-xs rounded-sm py-2 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white`}>
                                                    {servico.status_pagamento}
                                                </span>
                                            </td>
                                            <td className="p-2 text-center text-body align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                <span className="flex font-semibold leading-tight text-xs text-slate-400 justify-center">
                                                    <button onClick={() => window.open(servico.anexo_nota as string, "_blank")} className="hover:text-primary">
                                                        <svg
                                                            className="fill-current"
                                                            width="18"
                                                            height="18"
                                                            viewBox="0 0 18 18"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M16.8754 11.6719C16.5379 11.6719 16.2285 11.9531 16.2285 12.3187V14.8219C16.2285 15.075 16.0316 15.2719 15.7785 15.2719H2.22227C1.96914 15.2719 1.77227 15.075 1.77227 14.8219V12.3187C1.77227 11.9812 1.49102 11.6719 1.12539 11.6719C0.759766 11.6719 0.478516 11.9531 0.478516 12.3187V14.8219C0.478516 15.7781 1.23789 16.5375 2.19414 16.5375H15.7785C16.7348 16.5375 17.4941 15.7781 17.4941 14.8219V12.3187C17.5223 11.9531 17.2129 11.6719 16.8754 11.6719Z"
                                                                fill=""
                                                            />
                                                            <path
                                                                d="M8.55074 12.3469C8.66324 12.4594 8.83199 12.5156 9.00074 12.5156C9.16949 12.5156 9.31012 12.4594 9.45074 12.3469L13.4726 8.43752C13.7257 8.1844 13.7257 7.79065 13.5007 7.53752C13.2476 7.2844 12.8539 7.2844 12.6007 7.5094L9.64762 10.4063V2.1094C9.64762 1.7719 9.36637 1.46252 9.00074 1.46252C8.66324 1.46252 8.35387 1.74377 8.35387 2.1094V10.4063L5.40074 7.53752C5.14762 7.2844 4.75387 7.31252 4.50074 7.53752C4.24762 7.79065 4.27574 8.1844 4.50074 8.43752L8.55074 12.3469Z"
                                                                fill=""
                                                            />
                                                        </svg>
                                                        <span>
                                                            PDF
                                                        </span>
                                                    </button>
                                                </span>
                                            </td>
                                            <td className="p-2 text-center text-body align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                <span className="flex font-semibold leading-tight text-xs text-slate-400 justify-center">
                                                    <button onClick={() => window.open(servico.anexo_comprovante as string, "_blank")} className="hover:text-primary">
                                                        <svg
                                                            className="fill-current"
                                                            width="18"
                                                            height="18"
                                                            viewBox="0 0 18 18"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M16.8754 11.6719C16.5379 11.6719 16.2285 11.9531 16.2285 12.3187V14.8219C16.2285 15.075 16.0316 15.2719 15.7785 15.2719H2.22227C1.96914 15.2719 1.77227 15.075 1.77227 14.8219V12.3187C1.77227 11.9812 1.49102 11.6719 1.12539 11.6719C0.759766 11.6719 0.478516 11.9531 0.478516 12.3187V14.8219C0.478516 15.7781 1.23789 16.5375 2.19414 16.5375H15.7785C16.7348 16.5375 17.4941 15.7781 17.4941 14.8219V12.3187C17.5223 11.9531 17.2129 11.6719 16.8754 11.6719Z"
                                                                fill=""
                                                            />
                                                            <path
                                                                d="M8.55074 12.3469C8.66324 12.4594 8.83199 12.5156 9.00074 12.5156C9.16949 12.5156 9.31012 12.4594 9.45074 12.3469L13.4726 8.43752C13.7257 8.1844 13.7257 7.79065 13.5007 7.53752C13.2476 7.2844 12.8539 7.2844 12.6007 7.5094L9.64762 10.4063V2.1094C9.64762 1.7719 9.36637 1.46252 9.00074 1.46252C8.66324 1.46252 8.35387 1.74377 8.35387 2.1094V10.4063L5.40074 7.53752C5.14762 7.2844 4.75387 7.31252 4.50074 7.53752C4.24762 7.79065 4.27574 8.1844 4.50074 8.43752L8.55074 12.3469Z"
                                                                fill=""
                                                            />
                                                        </svg>
                                                        <span>
                                                            PDF
                                                        </span>
                                                    </button>
                                                </span>
                                            </td>
                                            {userType == 'admin' &&
                                                <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                    <Menu as="div" className="relative inline-block text-left">
                                                        <div>
                                                            <Menu.Button className="inline-flex w-full justify-center rounded-md bg-primary bg-opacity-20 px-3 py-2 text-sm font-medium text-white hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                                                <PiDotsThreeOutlineVerticalFill />
                                                            </Menu.Button>
                                                        </div>
                                                        <Transition
                                                            as={Fragment}
                                                            enter="transition ease-out duration-100"
                                                            enterFrom="transform opacity-0 scale-95"
                                                            enterTo="transform opacity-100 scale-100"
                                                            leave="transition ease-in duration-75"
                                                            leaveFrom="transform opacity-100 scale-100"
                                                            leaveTo="transform opacity-0 scale-95"
                                                        >
                                                            <Menu.Items className="absolute right-0 z-99999 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                <div onClick={() => handleEditService(servico)} className="px-1 py-1 ">
                                                                    <Menu.Item>
                                                                        {({ active }) => (
                                                                            <button
                                                                                className={`${active ? 'bg-graydark/30 text-white' : 'text-gray-900'
                                                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                            >
                                                                                {active ? (
                                                                                    <EditActiveIcon
                                                                                        className="mr-2 h-5 w-5"
                                                                                        aria-hidden="true"
                                                                                    />
                                                                                ) : (
                                                                                    <EditInactiveIcon
                                                                                        className="mr-2 h-5 w-5"
                                                                                        aria-hidden="true"
                                                                                    />
                                                                                )}
                                                                                Edit
                                                                            </button>
                                                                        )}
                                                                    </Menu.Item>

                                                                </div>

                                                                <div onClick={() => handleRemoveService(servico)} className="px-1 py-1">
                                                                    <Menu.Item>
                                                                        {({ active }) => (
                                                                            <button
                                                                                className={`${active ? 'bg-graydark/30 text-white' : 'text-gray-900'
                                                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                            >
                                                                                {active ? (
                                                                                    <DeleteActiveIcon
                                                                                        className="mr-2 h-5 w-5 text-primary"
                                                                                        aria-hidden="true"
                                                                                    />
                                                                                ) : (
                                                                                    <DeleteInactiveIcon
                                                                                        className="mr-2 h-5 w-5 text-primary"
                                                                                        aria-hidden="true"
                                                                                    />
                                                                                )}
                                                                                Delete
                                                                            </button>
                                                                        )}
                                                                    </Menu.Item>
                                                                </div>
                                                            </Menu.Items>
                                                        </Transition>
                                                    </Menu>
                                                </td>
                                            }

                                        </tr>
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ServiceList;



function EditInactiveIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 13V16H7L16 7L13 4L4 13Z"
                fill="#EDE9FE"
                stroke="#6370d8"
                strokeWidth="2"
            />
        </svg>
    )
}

function EditActiveIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 13V16H7L16 7L13 4L4 13Z"
                fill="#3C50E0"
                stroke="#7481dd"
                strokeWidth="2"
            />
        </svg>
    )
}


function DeleteInactiveIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="5"
                y="6"
                width="10"
                height="10"
                fill="#EDE9FE"
                stroke="#6370d8"
                strokeWidth="2"
            />
            <path d="M3 6H17" stroke="#6370d8" strokeWidth="2" />
            <path d="M8 6V4H12V6" stroke="#6370d8" strokeWidth="2" />
        </svg>
    )
}

function DeleteActiveIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="5"
                y="6"
                width="10"
                height="10"
                fill="#3C50E0"
                stroke="#7481dd"
                strokeWidth="2"
            />
            <path d="M3 6H17" stroke="#C4B5FD" strokeWidth="2" />
            <path d="M8 6V4H12V6" stroke="#C4B5FD" strokeWidth="2" />
        </svg>
    )
}