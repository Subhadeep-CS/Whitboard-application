import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DashboardTableHeaderType } from "@/types/constant.types";
import { DASHBOARD_TABLE_HEADER } from "@/utils/constant";
const DashboardTable = () => {
  return (
    <Table>
      <TableCaption>A list of your recent drawings.</TableCaption>
      <TableHeader>
        <TableRow>
          {DASHBOARD_TABLE_HEADER.map(
            (tableHeader: DashboardTableHeaderType) => (
              <TableHead
                className={`${tableHeader?.width ?? ""}`}
                key={crypto.randomUUID()}
              >
                {tableHeader.name}
              </TableHead>
            )
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default DashboardTable;
