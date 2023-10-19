'use client'
import React from 'react'
import { addCondominio, removeCondominio } from '../functions/actions';
import { Database } from '@/app/types/supabase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface CondFormProps {
    serviceData: Database['public']['Tables']['condominios']['Row'] | null;
    onUpdate: (data: any) => void;
    onReset: () => void;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function CondForm() {
    return (
        <div>CondForm</div>
    )
}

export default CondForm