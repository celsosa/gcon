import { Database } from "@/app/types/supabase";

type Servico = Database['public']['Tables']['servicos']['Row'];
interface ServiceListProps {
    servicos: Servico[] | null;
}

function ServiceList({ servicos }: ServiceListProps) {

    console.log(servicos, 'condominioIdcondominioId')

    return (
        <div className="flex flex-col">

            <div className="relative flex flex-col w-full min-w-0 mb-0 break-words bg-white border-0 border-transparent border-solid shadow-xl rounded-2xl bg-clip-border">
                <div className="p-6 pb-0 mb-0 bg-white rounded-t-2xl">
                    <h6>Authors table</h6>
                </div>
                <div className="flex-auto px-0 pt-0 pb-2">
                    <div className="p-0 overflow-x-auto">
                        <table className="items-center w-full mb-0 align-top border-bodydark text-body">
                            <thead className="align-bottom text-primary">
                                <tr>
                                    <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-bodydark shadow-none text-xs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Serviço</th>
                                    <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-bodydark shadow-none text-xs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Data</th>
                                    <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-bodydark shadow-none text-xs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Nº da Nota</th>
                                    <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-bodydark shadow-none text-xs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Valor</th>
                                    <th className="px-6 py-3 font-semibold capitalize align-middle bg-transparent border-b border-bodydark border-solid shadow-none tracking-none whitespace-nowrap text-slate-400 opacity-70"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {servicos && servicos.map(servico => (
                                    <>
                                        <tr>
                                            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                <div className="flex px-2 py-1">
                                                    <div className="flex flex-col justify-center">
                                                        <h6 className="mb-0 leading-normal text-sm">{servico.nome}</h6>
                                                        <p className="mb-0 leading-tight text-xs text-slate-400">john@creative-tim.com</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                <p className="mb-0 font-semibold leading-tight text-xs">{servico.data_servico}</p>
                                                <p className="mb-0 leading-tight text-xs text-slate-400">Organization</p>
                                            </td>
                                            <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap shadow-transparent">
                                                <span className="bg-gradient-to-tl from-success to-meta-3 px-3 text-xs rounded-sm py-2 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white">Online</span>
                                            </td>
                                            <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                <span className="font-semibold leading-tight text-xs text-slate-400">R${servico.valor_nota}</span>
                                            </td>
                                            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                <a href="javascript:;" className="font-semibold leading-tight text-xs text-slate-400"> Edit </a>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="p-2 align-middle bg-transparent whitespace-nowrap shadow-transparent">
                                                <div className="flex px-2 py-1">
                                                    <div className="flex flex-col justify-center">
                                                        <h6 className="mb-0 leading-normal text-sm">{servico.nome}</h6>
                                                        <p className="mb-0 leading-tight text-xs text-slate-400">john@creative-tim.com</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-2 align-middle bg-transparent  whitespace-nowrap shadow-transparent">
                                                <p className="mb-0 font-semibold leading-tight text-xs">{servico.data_servico}</p>
                                                <p className="mb-0 leading-tight text-xs text-slate-400">Organization</p>
                                            </td>
                                            <td className="p-2 leading-normal text-center align-middle bg-transparent text-sm whitespace-nowrap shadow-transparent">
                                                <span className="bg-gradient-to-tl from-success to-meta-3 px-3 text-xs rounded-sm py-2 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white">Online</span>
                                            </td>
                                            <td className="p-2 text-center align-middle bg-transparent whitespace-nowrap shadow-transparent">
                                                <span className="font-semibold leading-tight text-xs text-slate-400">R${servico.valor_nota}</span>
                                            </td>
                                            <td className="p-2 align-middle bg-transparent  whitespace-nowrap shadow-transparent">
                                                <a href="javascript:;" className="font-semibold leading-tight text-xs text-slate-400"> Edit </a>
                                            </td>
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