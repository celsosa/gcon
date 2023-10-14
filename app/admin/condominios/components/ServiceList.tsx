'use client'
import { Database } from "@/app/types/supabase";
import { useState } from "react";
import { AiOutlinePlus } from 'react-icons/ai';
import Modal from "./Modal";
import ServiceForm from "./ServiceForm";

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

    return (
        <div className="flex flex-col">


            <Modal showModal={showModal} setShowModal={setShowModal}>
                <div className="relative p-6 flex-auto">
                    <p className="my-4 text-body text-base leading-relaxed">
                        <ServiceForm serviceData={serviceData} onUpdate={(data) => setServiceData(data)} condominioId={condominioId} />
                    </p>
                </div>
            </Modal>

            {userType == 'admin' &&
                <button type="button" onClick={() => setShowModal(true)}
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
                <div className="flex-auto px-0 pt-0 pb-2">
                    <div className="p-0 overflow-x-auto">
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
                                                <span className="bg-gradient-to-tl from-success to-meta-3 px-3 text-xs rounded-sm py-2 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white">{servico.status_pagamento}</span>
                                            </td>
                                            <td className="p-2 text-center text-body align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                <span className="flex font-semibold leading-tight text-xs text-slate-400 justify-center">
                                                    <button onClick={() => window.open("https://www.google.com", "_blank")} className="hover:text-primary">
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
                                                    <button onClick={() => window.open("https://www.google.com", "_blank")} className="hover:text-primary">
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

                                                    <a href="javascript:;" className="font-semibold leading-tight text-xs text-slate-400">Edit</a>
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