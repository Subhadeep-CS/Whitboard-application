"use client";
import { useUsersWhiteBoardsData } from "@/app/hook/useUsersWhiteBoardsData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserDesignDataType } from "@/types/component.type";
import { DashboardTableHeaderType } from "@/types/constant.type";
import { DASHBOARD_TABLE_HEADER } from "@/utils/constant";
import { Loader2Icon } from "lucide-react";
const DashboardTable = () => {
  const { whiteBoardsData, isLoading } = useUsersWhiteBoardsData();

  console.log("Whiteboard data", whiteBoardsData);
  if (isLoading) {
    return (
      <div>
        Loading design <Loader2Icon className="animate-spin" />
      </div>
    );
  }
  return (
    <Table>
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
        {whiteBoardsData.length > 0 ? (
          whiteBoardsData.map((userData: UserDesignDataType) => (
            <TableRow key={userData.id}>
              <TableCell className="font-medium">{userData.title}</TableCell>
              <TableCell>{userData.state}</TableCell>
              <TableCell>
                {new Date(userData.updatedAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={3}>No Design Found</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DashboardTable;
