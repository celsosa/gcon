export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      condominios: {
        Row: {
          contato: string | null
          created_at: string
          endereco: string | null
          id: number
          nome: string
          perfil_id: number | null
        }
        Insert: {
          contato?: string | null
          created_at?: string
          endereco?: string | null
          id?: number
          nome: string
          perfil_id?: number | null
        }
        Update: {
          contato?: string | null
          created_at?: string
          endereco?: string | null
          id?: number
          nome?: string
          perfil_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "condominios_perfil_id_fkey"
            columns: ["perfil_id"]
            referencedRelation: "perfil_usuarios"
            referencedColumns: ["id"]
          }
        ]
      }
      perfil_usuarios: {
        Row: {
          created_at: string
          email: string
          id: number
          tipo: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          tipo: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          tipo?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "perfil_usuarios_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      servicos: {
        Row: {
          anexo_comprovante: string | null
          anexo_nota: string | null
          condominio_id: number
          created_at: string
          data_servico: string
          datas_pagamentos: string[] | null
          descricao: string
          id: number
          id_nota: number | null
          nome: string
          status_pagamento: string | null
          valor_nota: number
          valor_pago: number | null
        }
        Insert: {
          anexo_comprovante?: string | null
          anexo_nota?: string | null
          condominio_id: number
          created_at?: string
          data_servico: string
          datas_pagamentos?: string[] | null
          descricao: string
          id?: number
          id_nota?: number | null
          nome: string
          status_pagamento?: string | null
          valor_nota: number
          valor_pago?: number | null
        }
        Update: {
          anexo_comprovante?: string | null
          anexo_nota?: string | null
          condominio_id?: number
          created_at?: string
          data_servico?: string
          datas_pagamentos?: string[] | null
          descricao?: string
          id?: number
          id_nota?: number | null
          nome?: string
          status_pagamento?: string | null
          valor_nota?: number
          valor_pago?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "servicos_condominio_id_fkey"
            columns: ["condominio_id"]
            referencedRelation: "condominios"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
