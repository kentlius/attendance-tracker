import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { validateRequest } from "@/lib/auth";
import { logout } from "@/utils/logout";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  async function userLogout() {
    "use server";

    const { session } = await validateRequest();
    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    await logout();

    revalidatePath("/");
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1>Hi, {user.username}!</h1>
      <form action={userLogout}>
        <Button>Logout</Button>
      </form>
    </main>
  );
}
