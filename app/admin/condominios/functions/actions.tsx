'use server'

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { Database } from '@/app/types/supabase';

const supabase = createServerActionClient({ cookies });

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
};
