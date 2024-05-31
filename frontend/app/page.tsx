import { redirect } from "next/navigation";
import Image from "next/image";

import { validateRequest } from "@/lib/auth";
import { CameraComponent } from "@/components/camera";
import { dateFormatter } from "@/utils/date-formatter";

async function getUserById(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function checkAttendanceRecord(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/employees/${id}/check`,
    {
      next: {
        tags: ["attendance"],
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  const { employee } = await getUserById(user.id);
  const attendanceRecord = await checkAttendanceRecord(employee.id);

  return (
    <main className="">
      {attendanceRecord ? (
        <div>
          <h1>Good morning, {employee.firstName}!</h1>
          <p>You have already checked in today.</p>
          <div>
            <p>
              Logged at{" "}
              <time>
                {dateFormatter.format(new Date(attendanceRecord.loggedAt))}
              </time>
            </p>
            <p>Status: {attendanceRecord.status}</p>
            <Image
              className="aspect-square rounded-md object-cover"
              height="64"
              src={
                !/^https?:\/\//.test(attendanceRecord.imageUrl)
                  ? `${process.env.NEXT_PUBLIC_API_URL}/${attendanceRecord.imageUrl}`
                  : attendanceRecord.imageUrl
              }
              width="64"
              alt="Attendance record image"
            />
          </div>
        </div>
      ) : (
        <CameraComponent employeeId={employee.id} />
      )}
    </main>
  );
}
