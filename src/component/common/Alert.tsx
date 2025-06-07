import { useDeleteWhiteboard } from "@/app/hook/useDeleteWhiteboard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2Icon, TrashIcon } from "lucide-react";
import { useState } from "react";

const Alert: React.FC<{ designId: string; refetch: () => void }> = ({
  designId,
  refetch,
}) => {
  console.log("designid", designId);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const { handleDeleteWhiteboardByID, isLoading } = useDeleteWhiteboard();
  const handleDeleteDesign = async () => {
    await handleDeleteWhiteboardByID(designId);
    refetch();
    setAlertOpen(false);
  };
  return (
    <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={"secondary"} size={"icon"} className="size-8">
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="!px-4 !py-4">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="!px-4">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteDesign} className="!px-4">
            {isLoading ? (
              <span>
                <Loader2Icon className="animate-spin" />
                Deleting...
              </span>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Alert;
