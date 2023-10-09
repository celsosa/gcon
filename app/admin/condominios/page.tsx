import React from 'react'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumbs';
import CondInfo from './components/CondInfo';

import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Condomínios | Painel GCon",
    description: "Página de gerenciamento de condomínios",
    // other metadata
};

function CondominiosPage() {

    return (
        <>
            <Breadcrumb pageName="Condomínios" />
            <CondInfo />
        </>

    )
}

export default CondominiosPage