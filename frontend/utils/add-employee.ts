import { revalidatePath } from "next/cache";

export async function addEmployee(formData: FormData) {
  "use server";

  const userId = formData.get("userId") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;

  const data = {
    userId: userId,
    firstName: firstName,
    lastName: lastName,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to add employee");
  }

  revalidatePath("/dashboard/employees");
}
