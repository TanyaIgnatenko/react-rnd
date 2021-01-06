import { useState, useEffect, RefObject } from "react";

export const useParentSize = (nodeRef: RefObject<HTMLElement>) => {
  const [parentSize, setParentSize] = useState({});

  useEffect(() => {
    if (!nodeRef.current) return;

    const { width, height } = nodeRef.current.parentNode.getBoundingClientRect();

    setParentSize({ width, height });
  }, [nodeRef]);

  return parentSize;
};
