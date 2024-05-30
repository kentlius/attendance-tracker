import { redirect } from "next/navigation";

import { validateRequest } from "@/lib/auth";
import { CameraComponent } from "@/components/camera";

export default async function Home() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  return (
    <main className="">
      <CameraComponent />
    </main>
  );
}
