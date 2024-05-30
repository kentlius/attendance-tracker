import Image from "next/image";
import { dateFormatter } from "@/utils/date-formatter";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type AttendanceRecord = {
  id: string;
  loggedAt: string;
  imageUrl: string;
  status: string;
};

export default function AttendanceTable(props: {
  attendanceRecords: AttendanceRecord[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Image</span>
          </TableHead>
          <TableCell>Logged At</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.attendanceRecords.map((record) => (
          <TableRow key={record.id}>
            <TableCell className="hidden sm:table-cell">
              <Image
                className="aspect-square rounded-md object-cover"
                height="64"
                src={
                  !/^https?:\/\//.test(record.imageUrl)
                    ? `${process.env.NEXT_PUBLIC_API_URL}/${record.imageUrl}`
                    : record.imageUrl
                }
                width="64"
                alt="Attendance record image"
              />
            </TableCell>
            <TableCell className="font-medium">
              {dateFormatter.format(new Date(record.loggedAt))}
            </TableCell>
            <TableCell>
              <Badge variant="outline">EARLY</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
