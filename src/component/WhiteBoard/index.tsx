"use client";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";

const WhiteBoard: React.FC = () => {
  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <Tldraw />
    </div>
  );
};

export default WhiteBoard;
