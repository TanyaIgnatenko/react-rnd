import { useState, useEffect, ReactRef } from "react";

export const useParentSize = (nodeRef: ReactRef<HTMLElement>) => {
  const [parentSize, setParentSize] = useState({});

  useEffect(() => {
    if (!nodeRef.current) return null;
    const { width, height } = nodeRef.current.parentNode.getBoundingClientRect();

    setParentSize({ width, height });
  }, [nodeRef]);

  return parentSize;
};
