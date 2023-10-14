'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/app/types/supabase';

const supabase = createClientComponentClient();

export async function addService(serviceData: Database['public']['Tables']['servicos']['Insert']) {
    const { data, error } = await supabase
        .from('servicos')
        .insert(serviceData);
    if (error) throw error;
    return data;
}

export async function removeService(serviceId: number) {
    const { error } = await supabase
        .from('servicos')
        .delete()
        .eq('id', serviceId);
    if (error) throw error;
}

export async function updateService(serviceId: number, updatedData: Database['public']['Tables']['servicos']['Update']) {
    const { data, error } = await supabase
        .from('servicos')
        .update(updatedData)
        .eq('id', serviceId);
    if (error) throw error;
    return data;
}
