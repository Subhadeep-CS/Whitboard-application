"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useCreateWhiteBoard } from "@/app/hook/useCreateWhiteBoard";

const CreateDesignModal = () => {
  const { handleCreateWhiteBoard, isLoading } = useCreateWhiteBoard();
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCreateButtonClick = () => {
    if (!title) {
      setError("*Please enter title to proceed");
      return;
    }
    handleCreateWhiteBoard(title);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"sm"} className="!px-4 !py-2">
          <PlusIcon /> Create Whiteboard
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md !px-4 !py-4">
        <DialogHeader>
          <DialogTitle>Create Whiteboard</DialogTitle>
          <DialogDescription>
            Enter the title and create your own design
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="title" className="sr-only">
              Enter Title
            </Label>
            <Input
              id="title"
              placeholder="Enter the title"
              className="!px-4"
              value={title}
              onChange={handleTitleChange}
              required
              onFocus={() => setError("")}
            />
            {error ? <p className="text-red-500">{error}</p> : null}
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              variant="destructive"
              className="cursor-pointer !px-4"
              disabled={isLoading}
            >
              Close
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer !px-4"
            disabled={isLoading}
            onClick={handleCreateButtonClick}
          >
            {isLoading ? (
              <span>
                <Loader2Icon className="animate-spin" /> Creating....
              </span>
            ) : (
              "Create"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDesignModal;
