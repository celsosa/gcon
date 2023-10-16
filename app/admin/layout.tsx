"use client";

import { useState, useEffect } from "react";
import Loader from "@/components/common/Loader";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import withAdmin from "@/components/withAdmin"; // Importe o HOC
import { useUserProfile } from "@/contexts/UserProfileContext";
import { Database } from "../types/supabase";
import { ToastContainer } from 'react-toastify';

type UserProfileHook = {
    userProfile: Database['public']['Tables']['perfil_usuarios']['Row'] | null;
    isLoading: boolean;
    errorProfile: any; // ou um tipo mais específico se você souber o formato do erro
};

function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const { userProfile: user, isLoading, errorProfile } = useUserProfile() as UserProfileHook;

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    return (
        <div className="dark:bg-boxdark-2 dark:text-bodydark flex flex-col">
            <ToastContainer />
            {loading ? (
                <Loader />
            ) : (
                <div className="flex h-screen overflow-hidden">
                    {/* <!-- ===== Sidebar Start ===== --> */}
                    <Sidebar
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />
                    {/* <!-- ===== Sidebar End ===== --> */}

                    {/* <!-- ===== Content Area Start ===== --> */}
                    <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-[#F8FAFC] dark:bg-boxdark-2">
                        {/* <!-- ===== Header Start ===== --> */}

                        {isLoading ?
                            <Loader /> :
                            <Header
                                sidebarOpen={sidebarOpen}
                                setSidebarOpen={setSidebarOpen}
                                email={user?.email || 'Entre'}
                            />
                        }

                        {/* <!-- ===== Header End ===== --> */}

                        {/* <!-- ===== Main Content Start ===== --> */}
                        <main className="mx-auto max-w-screen-2xl w-full p-4 md:p-6 2xl:p-10 mb-10">
                            {children}
                        </main>
                        {/* <!-- ===== Main Content End ===== --> */}
                    </div>
                    {/* <!-- ===== Content Area End ===== --> */}
                </div>
            )}
        </div>
    );
}

export default withAdmin(AdminLayout); 