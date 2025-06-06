import { useEffect } from "react";
import axiosInstance from "../services/axiosInstance";
import { Editor } from "tldraw";

export const useWhiteBoardAutoSave = (boardId: string, editor: Editor) => {
  useEffect(() => {
    if (!editor || !boardId) {
      return;
    }

    const handleAutoSave = async () => {
      const snapShot = editor.store.getStoreSnapshot();

      try {
        await axiosInstance.patch(`whiteboard/${boardId}`, {
          content: snapShot,
          state: "draft",
        });
        console.log("Save triggering");
      } catch (error) {
        console.log(error);
      }
    };

    const editorListner = editor.store.listen(handleAutoSave, {
      source: "user",
      scope: "document",
    });

    return () => editorListner();
  }, [editor, boardId]);
};
