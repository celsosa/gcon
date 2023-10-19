'use server'

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { Database } from '@/app/types/supabase';

const supabase = createServerActionClient({ cookies });

//SERVICE FUNCTIONS
export const addService = async (serviceData: Database['public']['Tables']['servicos']['Insert']) => {
    const { data, error } = await supabase
        .from('servicos')
        .insert(serviceData);
    if (error) throw error;
    revalidatePath('/admin/condominios/[id]')
    return data;
};

export const updateService = async (serviceId: number, updatedData: Database['public']['Tables']['servicos']['Update']) => {
    const { data, error } = await supabase
        .from('servicos')
        .update(updatedData)
        .eq('id', serviceId);
    if (error) throw error;
    revalidatePath('/admin/condominios/[id]')
    return data;

};

export const removeService = async (serviceId: number) => {
    const { error } = await supabase
        .from('servicos')
        .delete()
        .eq('id', serviceId);
    if (error) throw error;
    revalidatePath('/admin/condominios/[id]')
};

//COND FUNCTIONS
export const addCondominio = async (condominioData: Database['public']['Tables']['condominios']['Insert']) => {
    const { data, error } = await supabase
        .from('condominios')
        .insert(condominioData);
    if (error) throw error;
    revalidatePath('/admin/condominios');
    return data;
};

export const updateCondominio = async (condominioId: number, updatedData: Database['public']['Tables']['condominios']['Update']) => {
    const { data, error } = await supabase
        .from('condominios')
        .update(updatedData)
        .eq('id', condominioId);
    if (error) throw error;
    revalidatePath('/admin/condominios');
    return data;
};

export const removeCondominio = async (condominioId: number) => {
    const { error } = await supabase
        .from('condominios')
        .delete()
        .eq('id', condominioId);
    if (error) throw error;
    revalidatePath('/admin/condominios');
};
