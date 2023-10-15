'use client'
import React, { useState } from 'react';
import { addService, updateService, removeService } from '../functions/actions';
import { Database } from '@/app/types/supabase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface ServiceFormProps {
    serviceData: Database['public']['Tables']['servicos']['Row'] | null;
    onUpdate: (data: any) => void;
    condominioId: number;
    onReset: () => void;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}


const ServiceForm: React.FC<ServiceFormProps> = ({ serviceData, onUpdate, onReset, condominioId, setShowModal }) => {
    const [nome, setNome] = useState(serviceData ? serviceData.nome : '');
    const [descricao, setDescricao] = useState(serviceData ? serviceData.descricao : '');
    const [dataServico, setDataServico] = useState(serviceData ? serviceData.data_servico : '');
    const [idNota, setIdNota] = useState(serviceData ? serviceData.id_nota : 0);
    const [valor, setValor] = useState(serviceData ? serviceData.valor_nota : 0);
    const [valorPago, setValorPago] = useState(serviceData ? serviceData.valor_pago : 0);
    const [anexoNota, setAnexoNota] = useState(serviceData ? serviceData.anexo_nota : null);
    const [anexoComprovante, setAnexoComprovante] = useState(serviceData ? serviceData.anexo_comprovante : null);
    const [datasPagamentos, setDatasPagamentos] = useState(serviceData ? serviceData.datas_pagamentos : []);
    //const [condId, setCondId] = useState(serviceData ? serviceData.condominio_id : 0);

    const [loading, setLoading] = useState(false);

    type NewServiceData = Database['public']['Tables']['servicos']['Insert'];
    type UpdatedServiceData = Database['public']['Tables']['servicos']['Update'];

    const handleAdd = async (newService: NewServiceData) => {
        const data = await addService(newService);
        onUpdate(data);
    };

    const handleUpdate = async (serviceId: number, updatedService: UpdatedServiceData) => {
        const data = await updateService(serviceId, updatedService);
        onUpdate(data);
    };

    const handleRemove = async (event: React.FormEvent) => {
        event.preventDefault();
        if (serviceData?.id) {
            await removeService(serviceData.id);
            onUpdate(null);
        }
    };

    const handleAddDate = (event: React.MouseEvent) => {
        event.preventDefault();
        const newDate = (document.getElementById('dataPagamento') as HTMLInputElement).value;
        if (newDate) {
            setDatasPagamentos(prevDates => [...(prevDates || []), newDate]);
        }
    };

    const handleRemoveDate = (dateToRemove: string) => {
        setDatasPagamentos(prevDates => prevDates?.filter(date => date !== dateToRemove) || null);
    };

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const serviceDataToSubmit = {
            nome,
            descricao,
            data_servico: dataServico,
            id_nota: idNota,
            valor_nota: valor,
            valor_pago: valorPago,
            anexo_nota: anexoNota,
            anexo_comprovante: anexoComprovante,
            datas_pagamentos: datasPagamentos,
            condominio_id: condominioId
        };
        try {
            let response;
            if (serviceData?.id) {
                response = await handleUpdate(serviceData.id, serviceDataToSubmit as UpdatedServiceData);
            } else {
                response = await handleAdd(serviceDataToSubmit as NewServiceData);
            }

            // Se chegou aqui, a operação foi bem-sucedida
            setShowModal(false);  // Fecha o modal se a ação foi bem-sucedida
            toast.success('Serviço adicionado com sucesso');
            onUpdate(serviceDataToSubmit);  // Atualiza os dados

        } catch (error) {
            console.error(error);  // Log do erro
            toast.error('Erro ao adicionar o serviço.');  // Mostra mensagem de erro
        } finally {
            setLoading(false);  // Reseta o estado de loading independentemente do sucesso ou falha
        }
    };


    return (
        <form onSubmit={handleFormSubmit}>
            <div className='grid grid-cols-2 gap-4'>
                <div className='flex flex-col'>
                    <label htmlFor='nome' className='mb-1 text-sm font-bold'>Nome</label>
                    <input type="text" id='nome' value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" className='p-2 border rounded' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='descricao' className='mb-1 text-sm font-bold'>Descrição</label>
                    <textarea id='descricao' value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" className='p-2 border rounded'></textarea>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='dataServico' className='mb-1 text-sm font-bold'>Data do Serviço</label>
                    <input type="date" id='dataServico' value={dataServico} onChange={(e) => setDataServico(e.target.value)} className='p-2 border rounded' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='idNota' className='mb-1 text-sm font-bold'>Nº da Nota</label>
                    <input type="number" id='idNota' value={idNota ? idNota : 0} onChange={(e) => setIdNota(Number(e.target.value))} className='p-2 border rounded' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='valor' className='mb-1 text-sm font-bold'>Valor da Nota</label>
                    <input type="number" id='valor' value={valor} onChange={(e) => setValor(Number(e.target.value))} className='p-2 border rounded' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='valorPago' className='mb-1 text-sm font-bold'>Valor Pago</label>
                    <input type="number" id='valorPago' value={valorPago ? valorPago : 0} onChange={(e) => setValorPago(Number(e.target.value))} className='p-2 border rounded' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='anexoNota' className='mb-1 text-sm font-bold'>Anexo da Nota</label>
                    <input type="text" id='anexoNota' value={anexoNota ? anexoNota : ''} onChange={(e) => setAnexoNota(e.target.value)} placeholder="Url da nota" className='p-2 border rounded' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='anexoComprovante' className='mb-1 text-sm font-bold'>Anexo do Comprovante</label>
                    <input type="text" id='anexoComprovante' value={anexoComprovante ? anexoComprovante : ''} onChange={(e) => setAnexoComprovante(e.target.value)} placeholder="Url do comprovante" className='p-2 border rounded' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='dataPagamento' className='mb-1 text-sm font-bold'>Data de Pagamento</label>
                    <input type="date" id='dataPagamento' className='p-2 border rounded' />
                    <button onClick={(event) => handleAddDate(event)}>Adicionar Data</button>
                    {datasPagamentos && (
                        <ul>
                            {datasPagamentos.map((date, index) => (
                                <li key={index}>
                                    {date}
                                    <button onClick={() => handleRemoveDate(date)}>X</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-strokedark mt-5 rounded-b">
                <button
                    className="bg-meta-3 hover:bg-opacity-90 active:bg-success disabled:cursor-auto disabled:bg-success disabled:shadow-none text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    disabled={loading}
                >
                    {loading && serviceData ? 'Atualizando...'
                        : loading && !serviceData ? 'Adicionando...'
                            : (serviceData ? 'Atualizar' : 'Adicionar')}
                </button>

            </div>
        </form>

    );
};

export default ServiceForm;