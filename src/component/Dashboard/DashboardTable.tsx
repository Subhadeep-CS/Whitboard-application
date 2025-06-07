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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { UserDesignDataType } from "@/types/component.type";
import { DashboardTableHeaderType } from "@/types/constant.type";
import { DASHBOARD_TABLE_HEADER } from "@/utils/constant";
import { Loader2Icon } from "lucide-react";
import Alert from "../common/Alert";
import { useStatusUpdate } from "@/app/hook/useStatusUpdate";
const DashboardTable = () => {
  const { whiteBoardsData, isLoading } = useUsersWhiteBoardsData();
  const { handleSubmitPublish, isLoading: isPublishSubmit } = useStatusUpdate();

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
          whiteBoardsData.map((userData: UserDesignDataType, index: number) => (
            <TableRow key={userData.id}>
              <TableCell className="font-medium">{userData.title}</TableCell>
              <TableCell>{userData.state}</TableCell>
              <TableCell>
                {new Date(userData.updatedAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`switch=${index + 1}`}
                    checked={userData.state === "publish"}
                    onCheckedChange={(checked) => {
                      const updatedState = checked ? "publish" : "draft";
                      handleSubmitPublish(userData.id, updatedState);
                    }}
                    disabled={isPublishSubmit}
                  />
                  <Label htmlFor={`switch=${index + 1}`}>
                    {userData.state === "publish" ? "Published" : "Draft"}
                  </Label>
                </div>
              </TableCell>
              <TableCell>
                <Alert designId={userData.id} />
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
