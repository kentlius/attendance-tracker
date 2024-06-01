import { revalidatePath, revalidateTag } from "next/cache";

export async function deleteEmployee(id: string) {
  "use server";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/employees/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to delete employee");
  }

  revalidateTag("employees");
  revalidatePath("/dashboard/employees");
}
