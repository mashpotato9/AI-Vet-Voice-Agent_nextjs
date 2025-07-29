import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SessionInfo } from "../vet-agent/[sessionId]/page";
import { Button } from "@/components/ui/button";
import moment from "moment";

type props = {
  history: SessionInfo[];
};

export default function HistoryTable({ history }: props) {
  return (
    <Table>
      <TableCaption>Previous Consultation Reports</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">Vet Agent Specialist</TableHead>
          <TableHead className="w-[300px]">Description</TableHead>
          <TableHead className="w-[300px]">Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {history.map((session: SessionInfo, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{session.selectedVet.specialist}</TableCell>
            <TableCell>{session.notes}</TableCell>
            <TableCell>{moment(session.createdAt).format("MMMM Do YYYY")}</TableCell>
            <TableCell className="text-right">
              <Button variant="outline">View Report</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
