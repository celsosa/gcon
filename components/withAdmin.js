"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Loader from "@/components/common/Loader";

function useAdminRedirect() {
  const supabase = createClientComponentClient();
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter(); // Usando useRouter

  useEffect(() => {
    async function checkUserRole() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Check if user is authenticated
      if (!user) {
        router.push("/login"); // Usando router.push
        setIsChecking(false);
        return;
      }

      const { data, error } = await supabase
        .from("perfil_usuarios")
        .select("tipo")
        .eq("user_id", user.id);

      if (error) {
        console.error("Failed to fetch user profile:", error);
        router.push("/");
        setIsChecking(false);
        return;
      }

      if (data[0].tipo !== "admin" && data[0].tipo !== "cliente") {
        router.push("/unauthorized");
      }
      setIsChecking(false);
    }

    checkUserRole();
  }, [supabase]);

  return isChecking;
}

export default function withAdmin(Component) {
  return function WrappedComponent(props) {
    const isChecking = useAdminRedirect();
    if (isChecking) {
      return <Loader />;
    }
    return <Component {...props} />;
  };
}
