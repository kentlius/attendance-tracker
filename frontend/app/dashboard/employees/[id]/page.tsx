import { File, ListFilter, PlusCircle } from "lucide-react";

import EmployeeTable from "@/components/employee-table";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AttendanceTable from "@/components/attendance-table";

async function getEmployee(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getAttendanceRecordsByEmployeeId(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/employees/${id}/records`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  status: string;
};

type AttendanceRecord = {
  id: string;
  loggedAt: string;
  imageUrl: string;
  status: string;
};

export default async function Employee({
  params: { id },
}: {
  params: { id: string };
}) {
  const employeeData: Employee = await getEmployee(id);
  const attendanceRecordsData: AttendanceRecord[] =
    await getAttendanceRecordsByEmployeeId(id);

  const [employee, attendanceRecords] = await Promise.all([
    employeeData,
    attendanceRecordsData,
  ]);

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Early</TabsTrigger>
            <TabsTrigger value="draft">On Time</TabsTrigger>
            <TabsTrigger value="archived" className="hidden sm:flex">
              Late
            </TabsTrigger>
            <TabsTrigger value="archived" className="hidden sm:flex">
              Absent
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Early
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>On Time</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Late</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Absent</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Employee
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>
                {employee.firstName} {employee.lastName}
              </CardTitle>
              <CardDescription>{employee.status}</CardDescription>
            </CardHeader>
            <CardContent>
              <AttendanceTable attendanceRecords={attendanceRecords} />
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of{" "}
                <strong>{attendanceRecords.length}</strong> record
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
