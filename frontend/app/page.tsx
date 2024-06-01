import Image from "next/image";
import { redirect } from "next/navigation";

import { validateRequest } from "@/lib/auth";
import { CameraComponent } from "@/components/camera";
import { dateFormatter } from "@/utils/date-formatter";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      {attendanceRecord ? (
        <Card>
          <CardHeader>
            <CardTitle>Good morning, {employee.firstName}!</CardTitle>
            <CardDescription>
              You have already checked in today.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Image
              className="aspect-square rounded-md object-cover"
              alt="Attendance record image"
              src={
                !/^https?:\/\//.test(attendanceRecord.imageUrl)
                  ? `${process.env.NEXT_PUBLIC_API_URL}/${attendanceRecord.imageUrl}`
                  : attendanceRecord.imageUrl
              }
              width={300}
              height={300}
            />
          </CardContent>
          <CardFooter>
            <div className="flex flex-col">
              <time>
                {dateFormatter.format(new Date(attendanceRecord.loggedAt))}
              </time>
              <p>{attendanceRecord.status}</p>
            </div>
          </CardFooter>
        </Card>
      ) : (
        <CameraComponent employeeId={employee.id} />
      )}
    </main>
  );
}
