// withAdmin.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "path/to/your/supabaseClient";

export default function withAdmin(Component) {
  return function WrappedComponent(props) {
    const router = useRouter();

    useEffect(() => {
      async function checkUserRole() {
        const user = supabase.auth.user();
        const { data } = await supabase
          .from("perfil_usuarios")
          .select("tipo")
          .eq("user_id", user.id);
        if (data[0].tipo !== "admin") {
          router.push("/unauthorized");
        }
      }

      checkUserRole();
    }, []);

    return <Component {...props} />;
  };
}
