import ServiceList from "../components/ServiceList";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumbs";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers'
import { Database } from "@/app/types/supabase";

import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Serviços | GCon",
    description: "Página de serviços GCon.",
    // other metadata

};

type Servico = Database['public']['Tables']['servicos']['Row'];

interface ServicosProps {
    params: {
        id: number;
        servicos: Servico[] | null;
    };
}

export default async function Servicos({ params }: ServicosProps) {

    const supabase = createServerComponentClient({ cookies });
    const { data: servicos, error } = await supabase
        .from('servicos')
        .select('*')
        .eq('condominio_id', params.id);

    console.log(servicos, 'servicos')
    console.log(error, 'servicos')

    return (
        <div className='flex flex-col'>
            <Breadcrumb
                separator={<span> / </span>}
                customPath={"Serviços"}
                activeClasses='text-primary'
                containerClasses='flex py-5 bg-gradient-to-r from-purple-600 to-blue-600 float-right'
                listClasses='text-xl mx-2 font-semibold text-black dark:text-white hover:text-primary'
                capitalizeLinks
            />
            <ServiceList servicos={servicos} />
        </div>
    );
}