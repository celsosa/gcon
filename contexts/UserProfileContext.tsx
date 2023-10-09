'use client'
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

type UserProfileProviderProps = {
    children: React.ReactNode;
};

const UserProfileContext = createContext({
    userProfile: null,
    isLoading: true,
    errorProfile: null,
    // ... qualquer outra propriedade ou função que você queira adicionar
});

export const UserProfileProvider: React.FC<UserProfileProviderProps> = ({ children }) => {
    const [userProfile, setUserProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorProfile, setError] = useState<any>(null);
    const supabase = createClientComponentClient();
    const isMounted = useRef(true);

    useEffect(() => {
        async function fetchUserProfile() {
            console.log("Iniciando busca do perfil...");
            try {
                const { data: { user } } = await supabase.auth.getUser()
                console.log("Dados do usuário:", user);
                if (user) {
                    const { data: profile } = await supabase
                        .from('perfil_usuarios')
                        .select('*')
                        .eq('user_id', user.id)
                        .single();

                    console.log("Perfil do usuário:", profile);

                    if (profile && isMounted.current) {
                        setUserProfile(profile);
                    }
                }
            } catch (err) {
                console.error("Erro ao buscar perfil:", err);
                if (isMounted.current) {
                    setError(err);
                }
            } finally {
                console.log("Finalizando busca do perfil...");
                if (isMounted.current) {
                    setIsLoading(false);
                }
            }
        }

        fetchUserProfile();
    }, []);


    return (
        <UserProfileContext.Provider value={{ userProfile, isLoading, errorProfile }}>
            {children}
        </UserProfileContext.Provider>
    );
};

export const useUserProfile = () => {
    const context = useContext(UserProfileContext);
    if (context === undefined) {
        throw new Error('useUserProfile must be used within a UserProfileProvider');
    }
    return context;
};
