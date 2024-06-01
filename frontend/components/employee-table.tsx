import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmployeeActions } from "./employee-actions";

type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  status: string;
};

export default function EmployeeTable(props: { employees: Employee[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.employees.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell className="font-medium">
              {employee.firstName} {employee.lastName}
            </TableCell>
            <TableCell>
              <Badge variant="outline">{employee.status}</Badge>
            </TableCell>
            <TableCell>
              <EmployeeActions employee={employee} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
