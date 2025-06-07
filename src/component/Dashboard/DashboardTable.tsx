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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { UserDesignDataType } from "@/types/component.type";
import { DashboardTableHeaderType } from "@/types/constant.type";
import { DASHBOARD_TABLE_HEADER } from "@/utils/constant";
import { Loader2Icon } from "lucide-react";
import Alert from "../common/Alert";
import { useStatusUpdate } from "@/app/hook/useStatusUpdate";
import { ShareLinkDialogModal } from "./ShareLinkDialogModal";
import { useState, useMemo } from "react";

const DashboardTable = () => {
  const { whiteBoardsData, isLoading, refetch } = useUsersWhiteBoardsData();
  const { handleSubmitPublish, isLoading: isPublishSubmit } = useStatusUpdate();
  const [filter, setFilter] = useState<"all" | "draft" | "publish">("all");

  const filteredWhiteBoards = useMemo(() => {
    return whiteBoardsData.filter((board) => {
      if (filter === "all") return true;
      return board.state === filter;
    });
  }, [whiteBoardsData, filter]);

  if (isLoading) {
    return (
      <div>
        Loading design <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 w-full flex gap-2 justify-end items-center !mt-4">
        <Label htmlFor="filter-select" className="mb-1">
          Filter by Status
        </Label>
        <Select
          value={filter}
          onValueChange={(value) =>
            setFilter(value as "all" | "draft" | "publish")
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="publish">Published</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
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
          {filteredWhiteBoards.length > 0 ? (
            filteredWhiteBoards.map(
              (userData: UserDesignDataType, index: number) => (
                <TableRow key={userData.id} className="!py-16 !px-4">
                  <TableCell className="font-medium">
                    {userData.title}
                  </TableCell>
                  <TableCell>{userData.state}</TableCell>
                  <TableCell>
                    {new Date(userData.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`switch=${index + 1}`}
                        checked={userData.state === "publish"}
                        onCheckedChange={async (checked) => {
                          const updatedState = checked ? "publish" : "draft";
                          await handleSubmitPublish(userData.id, updatedState);
                          refetch();
                        }}
                        disabled={isPublishSubmit}
                      />
                      <Label htmlFor={`switch=${index + 1}`}>
                        {userData.state === "publish" ? "Published" : "Draft"}
                      </Label>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Alert designId={userData.id} refetch={refetch} />
                    {userData.state === "publish" && (
                      <ShareLinkDialogModal slug={userData.slug} />
                    )}
                  </TableCell>
                </TableRow>
              )
            )
          ) : (
            <TableRow>
              <TableCell colSpan={3}>No Design Found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default DashboardTable;
