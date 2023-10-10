import { UUID } from "crypto";

export interface Condominio {
    id: number;
    created_at: any;
    nome: string;
    endereco: string;
    contato: string;
    perfil_id: any;
}

export interface Servico {
    id: number;
    created_at: string;
    data_servico: string;
    nome: string;
    descricao: string;
    valor_nota: number;
    valor_pago?: number;
    status_pagamento: string;
    anexo_nota?: string;
    anexo_comprovante?: string;
    condominio_id: number;
    data_pagamento?: string;
}

export interface UserProfile {
    email: string;
    created_at: any;
    id: number;
    tipo: string;
    user_id: UUID;
}


export interface UserProfileHook {
    userProfile: UserProfile | null;
    isLoading: boolean;
    errorProfile: any; // ou um tipo mais específico se você souber o formato do erro
}