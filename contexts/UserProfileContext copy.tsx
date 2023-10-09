
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers'
import React, { createContext, useContext } from 'react';

type UserProfileProviderProps = {
    children: React.ReactNode;
};

const UserProfileContext = createContext({
    userProfile: null,
    isLoading: true,
    errorProfile: null as any | null,
});

export const UserProfileProvider: React.FC<UserProfileProviderProps> = async ({ children }) => {
    const supabase = createServerComponentClient({ cookies });

    let userProfile = null;
    let errorProfile = null;

    try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            const { data: profile } = await supabase
                .from('perfil_usuarios')
                .select('*')
                .eq('user_id', user.id)
                .single();

            userProfile = profile;
        }
    } catch (err) {
        errorProfile = err;
    }

    return (
        <UserProfileContext.Provider value={{ userProfile, isLoading: false, errorProfile }}>
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