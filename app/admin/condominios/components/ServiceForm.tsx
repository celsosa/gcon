'use client'
import React, { useState } from 'react';
import { addService, updateService, removeService } from '../functions';
import { Database } from '@/app/types/supabase';

interface ServiceFormProps {
    serviceData: Database['public']['Tables']['servicos']['Row'] | null;
    onUpdate: (data: any) => void;
    condominioId: number;
}


const ServiceForm: React.FC<ServiceFormProps> = ({ serviceData, onUpdate, condominioId }) => {
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

    const handleAdd = async () => {
        const newService: Database['public']['Tables']['servicos']['Insert'] = {
            nome,
            descricao,
            data_servico: dataServico,
            id_nota: idNota,
            valor_nota: valor,
            valor_pago: valorPago,
            anexo_nota: anexoNota,
            anexo_comprovante: anexoComprovante,
            datas_pagamentos: datasPagamentos,
            condominio_id: condominioId,
        };
        const data = await addService(newService);
        onUpdate(data);
    };

    const handleUpdate = async () => {
        const updatedService: Database['public']['Tables']['servicos']['Update'] = {
            nome,
            descricao,
            data_servico: dataServico,
            id_nota: idNota,
            valor_nota: valor,
            valor_pago: valorPago,
            anexo_nota: anexoNota,
            anexo_comprovante: anexoComprovante,
            datas_pagamentos: datasPagamentos
        };
        if (serviceData?.id) {
            const data = await updateService(serviceData.id, updatedService);
            onUpdate(data);
        }
    };

    const handleRemove = async () => {
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

    return (
        <form>
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
                { /*
                <div className='flex flex-col'>
                    <label htmlFor='condId' className='mb-1 text-sm font-bold'>ID do Condomínio</label>
                    <input type="number" id='condId' value={condId} onChange={(e) => setCondId(Number(e.target.value))} className='p-2 border rounded' />
                </div>
                 */}
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-strokedark mt-5 rounded-b">

                {serviceData ?
                    (<button
                        className="bg-meta-3 hover:bg-opacity-90 active:bg-success text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleUpdate}
                    >
                        Atualizar
                    </button>) :
                    (<button
                        className="bg-meta-3 hover:bg-opacity-90 active:bg-success text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleAdd}
                    >
                        Adicionar
                    </button>)
                }
            </div>

        </form>

    );
};

export default ServiceForm;