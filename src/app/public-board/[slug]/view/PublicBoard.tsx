"use client";
import "tldraw/tldraw.css";
import { Editor, loadSnapshot, StoreSnapshot, Tldraw, TLRecord } from "tldraw";
const PublicBoard: React.FC<{
  title: string;
  initialContent: StoreSnapshot<TLRecord> | null;
}> = ({ title, initialContent }) => {
  const handleMount = (editor: Editor) => {
    if (initialContent) {
      console.log("Loading snapshot", initialContent);
      loadSnapshot(editor.store, initialContent);
      editor.updateInstanceState({ isReadonly: true });
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <Tldraw onMount={handleMount} />
    </div>
  );
};

export default PublicBoard;
