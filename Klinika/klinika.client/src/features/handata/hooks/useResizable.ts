import { useState, useRef, useEffect, MouseEvent, RefObject } from "react";

interface ResizableProps {
  initialWidth: number;
}

export function useResizable({ initialWidth }: ResizableProps) {
  const resizableRef = useRef<HTMLLIElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState(initialWidth);
  const [resizeStartX, setResizeStartX] = useState(0);

  const handleMouseDown = (e: MouseEvent<HTMLLIElement>) => {
    setIsResizing(true);
    setResizeStartX(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing) {
      const offsetX = e.clientX - resizeStartX;
      const newWidth = Math.max(100, width + offsetX);
      setWidth(newWidth);
      setResizeStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      if (isResizing) {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      }
    };
  }, [isResizing]);

  return { resizableRef, width, handleMouseDown };
}
