"use server";

import { revalidatePath } from "next/cache";

export async function editEmployee(id:string, formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;

  const data = {
    firstName: firstName,
    lastName: lastName,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to edit employee");
  }

  revalidatePath("/dashboard/employees");
}
