import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { logout } from "@/utils/logout";
import { validateRequest } from "@/lib/auth";

export default async function userLogout() {
  "use server";

  const { session } = await validateRequest();
  if (!session) {
    redirect("/login");
  }

  await logout();

  revalidatePath("/");
  redirect("/login");
}
