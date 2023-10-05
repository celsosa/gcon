import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    const response = await supabase.auth.exchangeCodeForSession(code);

    console.log("Response from exchangeCodeForSession:", response); // Log the response

    const user = response.data?.user;
    const error = response.error;

    if (user && !error) {
      const { data: userProfile, error: selectError } = await supabase
        .from("perfil_usuarios")
        .select()
        .eq("user_id", user.id);

      console.log("User profile from DB:", userProfile); // Log the user profile

      if (!userProfile || userProfile.length === 0) {
        const { data: insertData, error: insertError } = await supabase
          .from("perfil_usuarios")
          .insert([
            {
              user_id: user.id,
              tipo: "admin",
            },
          ]);

        console.log("Insert data:", insertData); // Log the insert result
        console.log("Insert error:", insertError); // Log any insert error
      }
    }
  }
  return NextResponse.redirect(requestUrl.origin);
}
