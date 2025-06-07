"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/app/services/axiosInstance";
import { Tldraw, useEditor } from "tldraw";
import "tldraw/tldraw.css";
import { useComments } from "@/app/hook/useComments";

const WhiteBoardAutoSaver: React.FC<{ boardId: string }> = ({ boardId }) => {
  const editor = useEditor();
  const { comments, isLoading, addComment } = useComments(boardId);

  const [newPin, setNewPin] = useState<{ x: number; y: number } | null>(null);
  const [commentText, setCommentText] = useState<string>("");

  // Auto-save effect
  useEffect(() => {
    if (!editor) return;

    const handleAutoSave = async () => {
      const snapShot = editor.store.getStoreSnapshot();

      try {
        await axiosInstance.patch(`whiteboard/${boardId}`, {
          content: snapShot,
        });
        console.log("Save triggering");
      } catch (error) {
        console.error(error);
      }
    };

    const editorListener = editor.store.listen(handleAutoSave, {
      source: "user",
      scope: "document",
    });

    return () => editorListener();
  }, [editor, boardId]);

  useEffect(() => {
    if (!editor) return;

    const handlePointerDown = (event: PointerEvent) => {
      const camera = editor.getCameraOptions() as unknown as {
        point: { x: number; y: number };
        zoom: number;
      };

      const zoom = camera.zoom;
      const center = camera.point;
      const bounds = editor.getContainer().getBoundingClientRect();

      const screenX = event.clientX - bounds.left;
      const screenY = event.clientY - bounds.top;
      const worldX = (screenX - bounds.width / 2) / zoom + center.x;
      const worldY = (screenY - bounds.height / 2) / zoom + center.y;

      setNewPin({ x: worldX, y: worldY });
    };

    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [editor]);

  const handleAddComment = async () => {
    if (!newPin || !commentText.trim()) return;

    await addComment({ x: newPin.x, y: newPin.y, text: commentText });
    setNewPin(null);
    setCommentText("");
  };

  if (!editor) return null;

  // Get camera options for rendering comments and newPin
  const camera = editor.getCameraOptions() as unknown as {
    point: { x: number; y: number };
    zoom: number;
  };
  const zoom = camera.zoom;
  const center = camera.point;
  const bounds = editor.getContainer().getBoundingClientRect();

  return (
    <>
      {comments.map((comment) => {
        // Convert comment world position to screen position
        const screenX = (comment.x - center.x) * zoom + bounds.width / 2;
        const screenY = (comment.y - center.y) * zoom + bounds.height / 2;

        return (
          <div
            key={comment.id}
            style={{
              position: "absolute",
              left: screenX,
              top: screenY,
              width: 20,
              height: 20,
              borderRadius: "50%",
              backgroundColor: "red",
              cursor: "pointer",
              transform: "translate(-50%, -50%)",
              pointerEvents: "auto",
            }}
            title={`${comment.text}\nBy: ${
              comment.author.email
            }\nAt: ${new Date(comment.createdAt).toLocaleString()}`}
          />
        );
      })}

      {newPin &&
        (() => {
          const screenX = (newPin.x - center.x) * zoom + bounds.width / 2;
          const screenY = (newPin.y - center.y) * zoom + bounds.height / 2;

          return (
            <div
              style={{
                position: "absolute",
                left: screenX,
                top: screenY,
                backgroundColor: "white",
                padding: 10,
                border: "1px solid black",
                borderRadius: 4,
                zIndex: 1000,
                transform: "translate(-50%, -100%)",
                pointerEvents: "auto",
                width: 220,
              }}
            >
              <textarea
                rows={3}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add comment"
                style={{ width: "100%", resize: "vertical" }}
              />
              <div
                style={{
                  marginTop: 8,
                  display: "flex",
                  gap: 8,
                  justifyContent: "flex-end",
                }}
              >
                <button onClick={handleAddComment}>Save</button>
                <button onClick={() => setNewPin(null)}>Cancel</button>
              </div>
            </div>
          );
        })()}

      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            padding: "5px 10px",
            backgroundColor: "rgba(0,0,0,0.7)",
            color: "white",
            borderRadius: 4,
            zIndex: 1000,
          }}
        >
          Comments Loading...
        </div>
      )}
    </>
  );
};

const WhiteBoard: React.FC<{ boardId: string }> = ({ boardId }) => {
  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <Tldraw persistenceKey={boardId}>
        <WhiteBoardAutoSaver boardId={boardId} />
      </Tldraw>
    </div>
  );
};

export default WhiteBoard;
