import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { deleteEmployee } from "@/utils/delete-employee";

export default async function deleteEmployeePage({
  params: { id },
}: {
  params: { id: string };
}) {
  "use server";

  await deleteEmployee(id);

  revalidatePath("/dashboard/employees");
  redirect("/dashboard/employees");
}
