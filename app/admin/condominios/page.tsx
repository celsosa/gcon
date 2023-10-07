import React from 'react'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumbs';
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Condomínios | Painel GCon",
    description: "Página de gerenciamento de condomínios",
    // other metadata
};

function page() {
    return (
        <>
            <Breadcrumb pageName="Condomínios" />
            <div>CONDOMINIOS TEST</div>
        </>

    )
}

export default page